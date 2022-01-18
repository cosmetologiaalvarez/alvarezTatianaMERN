import express from 'express';
import {carts, products} from '../daos/index.js'

const router = express.Router();

router.post('/', (req, res) => {
    let newCart = req.body;
    newCart.productos = [];
    carts.save(newCart).then(result => {
        res.send(result);
    }).catch(e => console.log(e))
})

router.delete('/:id', (req, res) => {
    let idCart = parseInt(req.params.id)
    carts.deteleById(idCart).then(result => {
        res.send(result);
    })
})

router.get('/:id/productos', (req, res) => {
    let idCart = parseInt(req.params.id)
    carts.getById(idCart).then(result => {
        res.send(result);
    })
})

router.post('/:id/productos/:id_prod', (req, res) => {
    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);
    carts.getById(id).then(result => {
        let updatedCart = result;
        products.getById(id_prod).then(prod => {
            if (prod.error) res.send(prod.error);
            products.validateExistingObject({code:prod.code}, result.productos).then(validateRes => {
                if (validateRes.error) res.send(validateRes.error);
                updatedCart['productos'].push(id_prod);
                carts.updateObject(id, updatedCart).then(newResult => {
                    res.send(newResult);
                })
            })
        })
    }).catch(e => console.log(e))
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);
    carts.deleteItemFromCollection(id, id_prod).then(result => {
        res.send(result);
    })
})

export default router;
