import __direname from "./utils.js";

export default{
    fileSystem: {
        baseUrl: __direname + '\\' + 'files\\'
    },
    mongo: {
        baseUrl: 'mongodb+srv://tati:tatiadmin@ecommerce.qgkhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    },
    fireBase: {
        baseUrl: 'https://coderhouse-mern-ecommerce.firebaseio.com'
    }
}