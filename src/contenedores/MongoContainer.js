import mongoose from 'mongoose';
import fileConfig from '../fileConfig.js'

mongoose.connect(fileConfig.mongo.baseUrl);

export default class MongoContainer {
    constructor(collection, schema, timestamps) {
        this.collection = mongoose.model(collection, new mongoose.Schema(schema, timestamps))
    }
    
    getAll = async () => {
        try { console.log('tati')
            let collectionItems = await this.collection.find();
            return {status: "success", payload: collectionItems}
        } catch (error) {
            return {status: "error", error: error}
        }
    }
    save = async (object) => {
        try {
            let newItem = this.collection.create(object);
            return {status: "success", payload: newItem}
        } catch (error) {
            return {status: "error", error: error}
        }
    }
    
    getById = async (id) => {
        try {
            let item = this.collection.find({"_id": id});
            return {status: "success", payload: item}
        } catch (error) {
            return {status: "error", error: error}
        }
    }

    deleteById = async (id) => {
        try {
            this.collection.deleteOne({"_id": id});
            return {status: "success", payload: 'Coleccion modificada'}
        } catch (error) {
            return {status: "error", error: error}
        }
    }

    updateById = async (id, body) => {
        try {
            this.collection.update({"_id": id}, {body});
            return {status: "success", payload: 'Coleccion modificada'}
        } catch (error) {
            return {status: "error", error: error}
        }
    }

    getByEmail = async (value) => {
        try {
            let item = this.collection.find({ 'email' : `${value}` })
            console.log(item)
            return {status: "success", payload: item}
        } catch (error) {
            return {status: "error", error: error}
        }
    }
}