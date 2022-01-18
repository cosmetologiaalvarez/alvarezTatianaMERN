import express from 'express';
import cors from 'cors';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io';
import __direname from './utils.js';
import cartRouter from './routes/cart.js';
import productRouter from './routes/products.js';
import generateProducts from './mocks/productos.js';
import {messages, products} from './daos/index.js'

const app = express();
const PORT = process.env.PORT || 8080;
const admin = true;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})

export const io = new Server(server);

app.use((req, res, next) => {
    req.auth = admin;
    next();
});
app.use(express.static(__direname+'/public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

app.engine('handlebars', engine());
app.set("view engine", "handlebars");
app.set("views", __direname+"/views");

server.on('error', (error) => console.log('Error en el servidor'));

app.get('/', (req, res) => {
    res.send(`Servidor escuchando en el puerto ${PORT}`);
})

app.get('/views/productos', (req, res) => {
    products.getAll().then((data) => {
        let productData = {
            products : data
        }
        res.render("productos", productData);
    });
})

app.get('/api/productos-test', (req, res) => {
    let productData = {
        products :  generateProducts()
    }
    res.render("productosRandom", productData);
})

io.on('connection', async socket=>{
    let productsCollection = await products.getAll();
    socket.emit('updateProducts', productsCollection);

    socket.on('message', async data => {
        data['timestamps'] = new Date();
        await messages.save(data);
        let loadMessages = await messages.getAll();
        console.log('çargando mensajes', loadMessages)
        io.emit('messageLog', loadMessages);
    });

    socket.emit('messageLog', await messages.getAll());
})
