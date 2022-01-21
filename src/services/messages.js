import database from "../sqlconfig.js";

export default class Messages{
    constructor() {
        database.schema.hasTable('messages').then(res => {
            if (!res) {
                database.schema.createTable('messages', table => {
                    table.increments();
                    table.string('user').notNullable();
                    table.string('email').notNullable();
                    table.string('message').notNullable();
                    table.timestamps(true, true);
                }).then(result => {
                    console.log('Table messages created');
                });
            }
        })
    }
    getAll = async () => {
        try {
            let messages = await database.select().table('messages')
            return {status: "success", payload: messages}
        } catch (error) { 
            return {status: "error", messages: error}
        }
    }
    saveMessage = async (message) =>{
        try {
            let result = await database.table('messages').insert(message)
            return {status: "success", payload: `Message registered with id: ${result[0]}`}
        } catch (error) {
            console.log(error);
            return {status: "error", message: error}
        }
    }
} 