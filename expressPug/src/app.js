import express from 'express';
import productRouter from './routes/products.js';
import cors from 'cors';
import {engine} from 'express-handlebars';
import Contenedor from './classes/Contenedor.js';

const app = express();
const PORT = 8080;
const productos = new Contenedor('productos');

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})

app.use(express.static('./public'));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productRouter);

app.engine('handlebars', engine());

app.set("view engine", "handlebars");

app.set("views", "./views");

server.on('error', (error) => console.log('Error en el servidor'));

app.get('/', (req, res) => {
    res.send(`Servidor escuchando en el puerto ${PORT}`);
})

app.get('/views/productos', (req, res) => {
    productos.getAll().then((data) => {
        let info = data.payload;
        let productData = {
            products : info
        }
        console.log('hay algo?',productData)
        res.render("productos", productData);
    });
})