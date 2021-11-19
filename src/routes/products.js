import express from 'express';
import Contenedor from '../classes/Contenedor.js';

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

router.post('/', (req, res) => {
    let newProduct = req.body;
    productos.save(newProduct).then(result => {
        res.send(result);
    }).catch(e => console.log(e))
})

router.delete('/:id', (req, res) => {
    let idProduct = parseInt(req.params.id)
    productos.deteleById(idProduct).then(result => {
        res.send(result);
    })
})

router.put('/:id', (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.id);
    productos.updateObject(id, body).then(result => {
        res.send(result);
    })
})

export default router;
