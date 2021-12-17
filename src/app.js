import express from 'express';
import productRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import cors from 'cors';
import {engine} from 'express-handlebars';
import Contenedor from './classes/Contenedor.js';
import __direname from './utils.js';
import {Server} from 'socket.io';
import Messages from './services/messages.js';

const app = express();
const PORT = process.env.PORT || 8080;
const productos = new Contenedor('productos');
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
    productos.getAll().then((data) => {
        let productData = {
            products : data
        }
        res.render("productos", productData);
    });
})

io.on('connection', async socket=>{
    let products = await productos.getAll();
    socket.emit('updateProducts', products);

    let messageService = new Messages();
    socket.on('message', async data => {
        messageService.saveMessage(data);
        let loadMessages = await messageService.getAll();
        console.log('çargando mensajes', loadMessages)
        io.emit('messageLog', loadMessages);
    });

    socket.emit('messageLog', await messageService.getAll());
})
