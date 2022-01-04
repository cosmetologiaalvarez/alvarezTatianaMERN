import express from 'express';
import {products} from '../daos/index.js'
import { authVerification } from '../utils.js';
import {io} from '../app.js';

const router = express.Router();

router.get('/', (req, res) => {
    products.getAll().then(result => {
        res.send(result);
    })
})

router.get('/:id', (req, res) => {
    let idProduct = parseInt(req.params.id)
    products.getById(idProduct).then(result => {
        res.send(result);

    })
})

router.post('/', authVerification, (req, res) => {
    let newProduct = req.body;
    let validate = {code:newProduct.code};
    products.save(newProduct, validate).then(result => {
        res.send(result);
        if (result.status == 'sucess') {
            products.getAll().then(result => {
                io.emit('updateProducts', result);
            })
        }
    }).catch(e => console.log(e))
})

router.delete('/:id', authVerification, (req, res) => {
    let idProduct = parseInt(req.params.id)
    products.deleteById(idProduct).then(result => {
        res.send(result);
    })
})

router.put('/:id', authVerification, (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.id);
    products.updateById(id, body).then(result => {
        res.send(result);
    })
})

export default router;
