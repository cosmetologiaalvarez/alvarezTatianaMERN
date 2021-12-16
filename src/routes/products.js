import express from 'express';
import Contenedor from '../classes/Contenedor.js';
import { authVerification } from '../utils.js';
import {io} from '../app.js';

const router = express.Router();
const productos = new Contenedor('productos');

router.get('/', (req, res) => {
    productos.getAll().then(result => {
        res.send(result);
    })
})

router.get('/:id', (req, res) => {
    let idProduct = parseInt(req.params.id)
    productos.getById(idProduct).then(result => {
        res.send(result);

    })
})

router.post('/', authVerification, (req, res) => {
    let newProduct = req.body;
    let validate = {"code":newProduct.code};
    productos.save(newProduct, validate).then(result => {
        res.send(result);
        if (result.status == 'sucess') {
            productos.getAll().then(result => {
                io.emit('updateProducts', result);
            })
        }
    }).catch(e => console.log(e))
})

router.delete('/:id', authVerification, (req, res) => {
    let idProduct = parseInt(req.params.id)
    productos.deteleById(idProduct).then(result => {
        res.send(result);
    })
})

router.put('/:id', authVerification, (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.id);
    productos.updateObject(id, body).then(result => {
        res.send(result);
    })
})

export default router;