import knex from "knex";
import __direname from "./utils.js";

const database = knex({
    client:'sqlite3',
    connection:{filename:__direname+'/db/ecommerce.sqlite'},
    useNullAsDefault: false
});

export default database;