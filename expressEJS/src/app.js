import express from 'express';
import productRouter from './routes/products.js';
import cors from 'cors';

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})

server.on('error', (error) => console.log('Error en el servidor'));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productRouter);

app.get('/', (req, res) => {
    res.send(`Servidor escuchando en el puerto ${PORT}`);
})
