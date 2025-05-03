import express from 'express';
import http from "http";
import { Server } from "socket.io";
import productRouter from './routes/products.router.js';
import { engine } from 'express-handlebars';
import cartsRouter from './routes/carts.router.js'
import realtimeproductsRouter from './routes/realTimeProducts.router.js';
import { Product } from './prod.js'
import connectionDB from './config/db.js';
import unifiedRouter from './routes/unified.Router.js';

const app = express();
const PORT = 8080
const server = http.createServer(app)
const product = new Product()
connectionDB()
app.use(express.json())
app.use(express.static(`public`))
//ws
const io = new Server(server)
io.on('connection', async (socket) => {
    socket.emit('up', await product.getProduct())

    socket.on('NewProduct', async (np) => {
        try {
            await product.addProduct(np)
            const updatedProducts = await product.getProduct()
            io.emit('up', updatedProducts) 
        } catch (error) {
            console.error('Error al añadir:', error)
        }
    })

    socket.on('del', async (data) => {
        const pid = data.pid
        try {
            await product.borrarProd(pid)
            const updatedProducts = await product.getProduct()
            io.emit('up', updatedProducts)
        } catch (error) {
            console.error('Error al eliminar:', error)
        }
    })
})

//handlebars
app.engine(`handlebars`, engine())
app.set(`view engine`, `handlebars`)
app.set(`views`, `./src/views`)

//endpoints
app.use("/", productRouter)
app.use("/", cartsRouter)
app.use(`/`, realtimeproductsRouter)
app.use("/", unifiedRouter)
server.listen(PORT, ()=>console.log(`escuchando en el ${PORT}`))
