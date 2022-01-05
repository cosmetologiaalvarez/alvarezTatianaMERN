import  admin  from 'firebase-admin';
import serviceAuth from '../db/firebaseKey.js';
import dbUrl from '../fileConfig.js';

admin.initializeApp({
    credential: admin.credential.cert(serviceAuth),
    databaseURL: dbUrl
})

export default class FireBaseContainer {
    constructor (collectionName) {
        const db = admin.firestore();
        this.collection = db.collection(collectionName);
    }
    getAll = async () => {
        try {
            const itemsData = await this.collection.get();
            const itemsObject = itemsData.docs;
            const items = itemsObject.map(current => current.data());
            return {status: "success", payload: items}
        } catch (error) {
            return {status: "error", error: error}
        }
    }
    save  = async (object) => {
        try {
            let newItem = await this.collection.set(object);
            return {status: "success", payload: newItem}
        } catch (error) {
            return {status: "error", error: error}
        }
    }
    getById  = async (id) => {
        try {
            let findItem = this.collection.doc(id);
            let item = await findItem.get();
            return {status: "success", payload: item.data()}
        } catch (error) {
            return {status: "error", error: error}
        }
    }
    deleteById = async (id) => {
        try {
            let findItem = this.collection.doc(id);
            let item = await findItem.delete();
            return {status: "success", payload: 'Coleccion modificada'}
        } catch (error) {
            return {status: "error", error: error}
        }
    }
    updateById = async (id, body) => {
        try {
            let findItem = this.collection.doc(id);
            let item = await findItem.update(body);
            return {status: "success", payload: item.data()}
        } catch (error) {
            return {status: "error", error: error}
        }
    } 

}