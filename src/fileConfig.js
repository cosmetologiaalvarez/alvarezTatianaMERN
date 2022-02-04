import __dirname from "./utils.js";
import dotenv from 'dotenv';
dotenv.config({ path: __dirname+'\\.env'});

export default{
    fileSystem: {
        baseUrl: __dirname + '\\' + 'files\\'
    },
    mongo: {
        baseUrl: process.env.DB_MONGO
    },
    fireBase: {
        baseUrl: process.env.DB_FIREBASE
    }
}
