import mongoose from 'mongoose';
import fileConfig from '../fileConfig.js';
import {ObjectId} from 'mongodb';

mongoose.connect(fileConfig.mongo.baseUrl);

export default class MongoContainer {
    constructor(collection, schema, timestamps) {
        this.collection = mongoose.model(collection, new mongoose.Schema(schema, timestamps))
    }
    
    getAll = async () => {
        try {
            let collectionItems = await this.collection.find();
            return {status: "success", payload: collectionItems}
        } catch (error) {
            return {status: "error", error: error}
        }
    }
    save = async (object) => {
        try {
            let newItem = await this.collection.create(object);
            return {status: "success", payload: newItem}
        } catch (error) {
            return {status: "error", error: error}
        }
    }
    
    getById = async (id) => {
        try {
            console.log('el ides',id)
            let item = await this.collection.findOne({_id: new ObjectId(id)});
            return {status: "success", payload: item}
        } catch (error) {
            return {status: "error", error: error}
        }
    }

    deleteById = async (id) => {
        try {
            await this.collection.deleteOne({"_id": id});
            return {status: "success", payload: 'Coleccion modificada'}
        } catch (error) {
            return {status: "error", error: error}
        }
    }

    updateById = async (id, body) => {
        try {
            await this.collection.update({"_id": id}, {body});
            return {status: "success", payload: 'Coleccion modificada'}
        } catch (error) {
            return {status: "error", error: error}
        }
    }

    getConnection = async () => {
        try {
            return this.collection
        } catch (error) {
            return {status: "error", error: error}
        }
    }
}