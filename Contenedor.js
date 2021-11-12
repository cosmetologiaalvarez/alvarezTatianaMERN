const fs = require('fs');
const { exit } = require('process');

class Contenedor {
    constructor (fileName) {
        this.file = fileName;
    }
    
    async save(obj) {
        let newObjId  = await this.getNewId();
        Object.assign(obj, {id: newObjId});
        let existingFile = await this.getFile();
        let newOjb = !existingFile ? [obj] : [... JSON.parse(existingFile), obj];
        try {
            await fs.promises.writeFile(`${this.file}.json`, JSON.stringify(newOjb));
            console.log(newObjId)
            return newObjId;
        } catch(err) {
            throw new Error(`Error de escritura: ${err}`);
        }
    }

    async getFile() {
        try {
            let file = await fs.promises.readFile(`${this.file}.json`, 'utf-8');
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
        } catch (error) {console.log('er:', error)
            return lastId;
        }
    }

    async getById(id) {
        try {
            const readObjs = await this.getFile();
            const savedObjs = readObjs == false ? false : JSON.parse(readObjs);
            if (savedObjs) {
                for (const property in savedObjs) {
                    if (savedObjs[property]['id'] === id) {
                        console.log(savedObjs[property]);
                        return savedObjs[property];
                    }
                }
            }
            console.log('NULL : No se encontro un objeto con el id ingresado');
            return null;
        } catch (error) {console.log('er:', error)
		    throw new Error(`Error en lectura: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const readObjs = await this.getFile();
            const savedObjs = readObjs != '' ? JSON.parse(readObjs) : false;
            if (savedObjs) {
                console.log(savedObjs);
                return savedObjs;
            }
            console.log('El archivo se encuentra vacio');
            return [];
        } catch (error) {console.log('er:', error)
            throw new Error(`Error en lectura: ${error}`);
        }
    }

    async deteleById(id) {
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
                    ? console.log('No se encontro un objeto con el id ingresado')
                    : await this.reMakeObj(updateFile);
                console.log(res);
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
            fs.promises.writeFile(`${this.file}.json`, '');
            console.log(`Se ha eliminado los objetos del archivo ${this.file}.json`);
        } catch(err) {
            throw new Error(`Error de escritura: ${err}`);
        }
    }

    async reMakeObj(obj) {
        try {
            await fs.promises.writeFile(`${this.file}.json`, JSON.stringify(obj));
            return 'Objeto Eliminado';
        } catch(err) {
            throw new Error(`Error de escritura: ${err}`);
        }
    }
}

module.exports = Contenedor;
