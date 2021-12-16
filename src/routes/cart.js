import express from 'express';
import Contenedor from '../classes/Contenedor.js';

const router = express.Router();
const carritos = new Contenedor('carrito');
const productos = new Contenedor('productos');

router.post('/', (req, res) => {
    let newCart = req.body;
    newCart.productos = [];
    carritos.save(newCart).then(result => {
        res.send(result);
    }).catch(e => console.log(e))
})

router.delete('/:id', (req, res) => {
    let idCart = parseInt(req.params.id)
    carritos.deteleById(idCart).then(result => {
        res.send(result);
    })
})

router.get('/:id/productos', (req, res) => {
    let idCart = parseInt(req.params.id)
    carritos.getById(idCart).then(result => {
        res.send(result);
    })
})

router.post('/:id/productos/:id_prod', (req, res) => {
    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);
    carritos.getById(id).then(result => {
        let updatedCart = result;
        productos.getById(id_prod).then( prod => {
            if (prod.error) return res.send(prod.error)
            productos.validateExistingObject({"code":prod.code}, JSON.parse(result.productos)).then( validateRes => {
                if (validateRes.error) return validateRes.error;
                updatedCart['productos'].push(prod);
                carritos.updateObject(id, updatedCart).then(newResult => {
                    res.send(newResult);
                })
            })
        })
    }).catch(e => console.log(e))
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);
    carritos.deleteItemFromCollection(id, id_prod).then(result => {
        res.send(result);
    })
})

export default router;
