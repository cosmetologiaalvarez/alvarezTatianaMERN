const express = require('express');
const Contenedor = require('../Contenedor');

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})

let productos = new Contenedor('productos');

app.get('/', (req, res) => {
    res.send(`Servidor escuchando en el puerto ${PORT}`);
})

app.get('/productos', (req, res) => {
    productos.getAll().then(result => {
        res.send(result);
    })
})

app.get('/productoRandom', (req, res) => {
    productos.getAll().then(result => {
        let randomItem = Math.floor(Math.random() * (result.length - 0)) + 0;
        res.send(result[randomItem]);
    })
})
