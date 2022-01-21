import database from "../sqlconfig.js";

export default class Products{
    constructor() {
        database.schema.hasTable('products').then(res => {
            if (!res) {
                database.schema.createTable('products', table => {
                    table.increments();
                    table.string('title').notNullable();
                    table.string('code').notNullable();
                    table.string('price').notNullable();
                    table.string('thumbnail').notNullable();
                }).then(result => {
                    console.log('Table products created');
                });
            }
        })
    }
    getAll = async () => {
        try {
            let products = await database.select().table('products');
            return {status: "success", payload: products}
        } catch (error) { 
            return {status: "error", products: error}
        }
    }
    saveProduct = async (product) =>{
        try {
            let result = await database.table('products').insert(product);
            return {status: "success", payload: `Product registered with id: ${result[0]}`}
        } catch (error) {
            console.log(error);
            return {status: "error", product: error}
        }
    }
    getById = async (id) => {
        try{
            let product = await database.select().table('products').where('id', id).first();
            if (product) {
                return {status: "success", payload: product}
            } else {
                return {status: "error", message: "Product not found"}
            }
        }catch (error){
            return {status: "error", message: error}
        }
    }
    save = async (product) =>{
        try{
            let exists = await database.table('products').select().where('code', product.code).first();
            if (exists) return {status: "error", message: "Code already exists"}
            let result = await database.table('products').insert(product)
            return {status: "success", payload: `Product registered with id: ${result[0]}`}
        }catch (error) {
            console.log(error);
            return {status: "error", message:error}
        }
    }
    updateById = async (id, body) => {
        database.select().table('products').where('id', id).update(body)
        .then((res) => {return {status: "success", payload: res}})
        .catch((err) => {return {status: "error", message: "Product not found"}})
    }
    deleteById = async (id) => {
        database.select().table('products').del().where('id', id)
        .then((res) => {return {status: "success", payload: res}})
        .catch((err) => {return {status: "error", message: "Product not found"}})
    }

} 