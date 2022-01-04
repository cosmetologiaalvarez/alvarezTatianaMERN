import express from 'express';
import {cart, products} from '../daos/index.js'

const router = express.Router();

router.post('/', (req, res) => {
    let newCart = req.body;
    newCart.products = [];
    cart.save(newCart).then(result => {
        res.send(result);
    }).catch(e => console.log(e))
})

router.delete('/:id', (req, res) => {
    let idCart = parseInt(req.params.id)
    cart.deleteById(idCart).then(result => {
        res.send(result);
    })
})

router.get('/:id/products', (req, res) => {
    let idCart = parseInt(req.params.id)
    cart.getById(idCart).then(result => {
        res.send(result);
    })
})

router.post('/:id/products/:id_prod', (req, res) => {
    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);
    cart.getById(id).then(result => {
        let updatedCart = result;
        products.getById(id_prod).then( prod => {
            if (prod.error) res.send(prod.error);
            products.validateExistingObject({code:prod.code}, result.products).then(validateRes => {
                if (validateRes.error) res.send(validateRes.error);
                updatedCart['products'].push(prod);
                cart.updateById(id, updatedCart).then(newResult => {
                    res.send(newResult);
                })
            })
        })
    }).catch(e => console.log(e))
})

router.delete('/:id/products/:id_prod', (req, res) => {
    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);
    cart.deleteItemFromCollection(id, id_prod).then(result => {
        res.send(result);
    })
})

export default router;
