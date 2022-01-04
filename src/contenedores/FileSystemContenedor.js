import fs from 'fs';
import __direname from '../utils.js';
import config from '../fileConfig.js';

export default class Contenedor {
    constructor (fileName) {
        this.file = `${config.fileSystem.baseUrl}${fileName}`;
    }
    
    async save(obj, validateData = false) {
        let existingFile = await this.getFile();
        if (validateData) {
            let isNewObject = await this.validateExistingObject(validateData, JSON.parse(existingFile));
            if (isNewObject.error) {
                return isNewObject;
            }
        }
        let newObjId  = await this.getNewId();
        Object.assign(obj, {id: newObjId});
        let newOjb = !existingFile ? [obj] : [... JSON.parse(existingFile), obj];
        try {
            await fs.promises.writeFile(`${this.file}`, JSON.stringify(newOjb));
            return newOjb;
        } catch(err) {
            throw new Error(`Error de escritura: ${err}`);
        }
    }

    async getFile() {
        try {
            let file = await fs.promises.readFile(`${this.file}`, 'utf-8');
            return file
        } catch(error) {
            return false;
        }
    }

    async getNewId() {
        let lastId = 1;
        try {
            const readObjs =  await this.getFile();
            const savedObjs = readObjs == false ? false : JSON.parse(readObjs);
            if (savedObjs) {
                for (const property in savedObjs) {
                    if (savedObjs[property]['id'] > lastId) lastId = savedObjs[property]['id'];
                }
                return ++lastId;
            }
            return lastId;
        } catch (error) {
            console.log('er:', error)
            return lastId;
        }
    }

    async getById(id) {
        try {
            const readObjs = await this.getFile();
            const savedObjs = readObjs && JSON.parse(readObjs);
            if (!savedObjs) return {error: 'No hay objetos en la coleccion'};
            return savedObjs.find(item => item.id == id) || {error: 'producto no encontrado'};
        } catch (error) {
		    throw new Error(`Error en lectura: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const readObjs = await this.getFile();
            const savedObjs = readObjs != '' ? JSON.parse(readObjs) : false;
            if (savedObjs) {
                return savedObjs;
            }
            console.log('El archivo se encuentra vacio');
            return [];
        } catch (error) {
            console.log('er:', error)
            throw new Error(`Error en lectura: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const readObjs =  await this.getFile();
            const savedObjs = readObjs == false ? false : JSON.parse(readObjs);
            let deleteObj = false;
            if (savedObjs) {
                let updateFile = [];
                for (const property in savedObjs) {
                    if (savedObjs[property]['id'] === id) {
                        deleteObj = savedObjs[property];
                    } else {
                        updateFile.push(savedObjs[property]);
                    }
                }
                let res = !deleteObj 
                    ? 'No se encontro un objeto con el id ingresado'
                    : await this.reMakeObj(updateFile);
                return res;
            } else {
                console.log('No hay objetos en el archivo');
            }
        } catch (error) {
            console.log('er:', error)
		    throw new Error(`Error en lectura: ${error.message}`);
        }
    }

    async deteleAll() {
        try {
            fs.promises.writeFile(`${this.file}`, '');
            console.log(`Se ha eliminado los objetos del archivo ${this.file}`);
        } catch(err) {
            throw new Error(`Error de escritura: ${err}`);
        }
    }

    async reMakeObj(obj) {
        try {
            await fs.promises.writeFile(`${this.file}`, JSON.stringify(obj));
            return 'Coleccion modificada';
        } catch(err) {
            throw new Error(`Error de escritura: ${err}`);
        }
    }

    async updateById(id, body) {
        try {
            let findObject = await this.getById(id);
            if (findObject.error) return findObject.error;
            let newData = {...findObject,...body};
            newData.id = id;
            let objCollection = await this.getAll();
            let updateFile = [];
            for (const property in objCollection) {
                if (objCollection[property]['id'] != id) {
                    updateFile.push(objCollection[property]);
                }
            }
            this.reMakeObj([...updateFile, newData]);
            return newData;
        } catch(err) {
            throw new Error(`Error en el proceso: ${err}`);
        }
    }

    async deleteItemFromCollection(idCollection, idItem) {
        try {
            const readObjs =  await this.getFile();
            const savedObjs = readObjs == false ? false : JSON.parse(readObjs);
            let deleteObj = false;
            let idFromCollection = false;
            if (savedObjs) {
                let updateFile = [];
                savedObjs.forEach(currentElement => {
                    if (currentElement['id'] == idCollection) {
                        idFromCollection = currentElement;
                    }
                });
                if (idFromCollection) {
                    idFromCollection['productos'].forEach(currentItem => {
                        if (currentItem['id'] != idItem) {
                            updateFile.push(currentItem);
                        } else {
                            deleteObj = true;
                        }
                    })
                }
                idFromCollection['productos'] = updateFile;
                let res = idFromCollection && deleteObj
                    ?  await this.updateById(idCollection, idFromCollection)
                    : 'No se encontro registro para los datos ingresados';
                return res;
            } else {
                console.log('No hay objetos en el archivo');
            }
        } catch (error) {
            console.log('er:', error)
		    throw new Error(`Error en lectura: ${error.message}`);
        }
    }

    async validateExistingObject(data, collection = []) {
        let dataKey = Object.keys(data)[0];
        let findDataInCollection = collection.find(item => item[dataKey] == Object.values(data)[0]);
        return findDataInCollection ? {error: 'Ya existe ese registro'} : false;
    }
}
