import express from 'express';
import cors from 'cors';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import dotenv from 'dotenv';
import { fork } from 'child_process';
import __dirname from './utils.js';
import productRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import baseUrl from './fileConfig.js';
import {users, messages, products} from './daos/index.js';
import initializePassportConfig from './logIn-config.js';

dotenv.config({ path: __dirname+'\\.env'});
const app = express();
const PORT = process.env.PORT || 8080;
const admin = true;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})

const initSession = (session({
    store: MongoStore.create({mongoUrl:baseUrl.mongo.baseUrl}),
    resave: false,
    saveUninitialized: false,
    secret: "secretString"
}))

export const io = new Server(server);

app.use((req, res, next) => {
    req.auth = admin;
    next();
});
app.use(express.static(__dirname+'/public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(initSession);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

app.engine('handlebars', engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

server.on('error', (error) => console.log('Error en el servidor'));

initializePassportConfig();

app.get('/', (req, res) => {
    res.send(`Servidor escuchando en el puerto ${PORT}`);
})

app.get('/views/productos', (req, res) => {
    products.getAll().then((data) => {
        let productData = {
            products : data.payload.map((currentItem) => {
                return {
                    title: currentItem.title,
                    price: currentItem.price,
                    thumbnail: currentItem.thumbnail 
                }
            })
        }
        res.render("productos", productData);
    });
})

app.get('/info', (req, res) => {
        let infoList = [
            {desc : 'Argumentos entrada', det: 'node minimist -p PUERTO'},
            {desc : 'Nombre plataforma', det : process.platform},
            {desc : 'Version Node', det : process.version},
            {desc : 'Memoria total reservada', det : process.memoryUsage().rss},
            {desc : 'Path ejecucion', det : process.cwd()},
            {desc : 'Process Id', det : process.pid},
            {desc : 'Carpeta del proyecto', det: __dirname},
        ]
        res.render("info", {infoList});
})

app.post('/login', async(req, res)=>{
    let {email, password} = req.body
    if (!email || !password) return res.send({status:400, msg: "Complete los datos obligatorios"})
    const db = await users.getConnection()
    const user = await db.findOne({email:email})
    if (!user) return res.send({status:400, msg: "No se encontro un usuario con los datos ingresados"})
    if (user && user.password !== password) return res.send({status:400, error: "Contraseña ingresada incorrecta"})
    if (user) {
        req.session.user = {
            username: user.username,
            email: user.email
        }
        res.send({status:200, msg: "Ha ingresado correctamente"})
    }
})

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}), (req, res) => {})

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:8080/pages/login.html',
    successRedirect: 'http://localhost:8080/'
}), (req, res) => {
    res.send({message: 'Se ha logueado'})
})

app.get('/api/randoms', async(req, res) => {
    let num = req.query.cant ?? 100000000
    const forked = fork('src/randomNumChild')

    forked.on('message', response => {
        console.log('Mensaje del child process:', response)
        res.send(response)
    })
    setTimeout(() => {
        forked.send({numero: num})
    }, 1000)
})

io.on('connection', async socket=>{
    let productos = await products.getAll();
    socket.emit('updateProducts', productos.payload);

    socket.on('message', async data => {
        messages.saveMessage(data);
        let loadMessages = await messages.getAll();
        io.emit('messageLog', loadMessages);
    });

    socket.emit('messageLog', await messages.getAll());
})
