import express from 'express';
import http from "http";
import { Server } from "socket.io";
import productRouter from './routes/products.router.js';
import { engine } from 'express-handlebars';
import cartsRouter from './routes/carts.router.js'
import realtimeproductsRouter from './routes/realTimeProducts.router.js';
import connectionDB from './config/db.js';
import Product from './models/productos.js';

const app = express();
const PORT = 8080
const server = http.createServer(app)

connectionDB()
app.use(express.json())
app.use(express.static(`public`))
//ws
const io = new Server(server)
io.on('connection', async (socket) => {
    socket.emit('up', await Product.find())

    socket.on('NewProduct', async (np) => {
        try {
            const npc = new Product(np)
            await npc.save()
            const updatedProducts = await Product.find()
            io.emit('up', updatedProducts) 
        } catch (error) {
            console.error('Error al añadir:', error)
        }
    })

    socket.on('del', async (data) => {
        const pid = data.pid
        try {
            const pd = await Product.findByIdAndDelete(pid)
            const updatedProducts = await Product.find()
            console.log(`se borro el prodicto ${pd}`)
            io.emit('up', updatedProducts)
        } catch (error) {
            console.error('Error al eliminar:', error)
        }
    })
})

//handlebars
app.engine(`handlebars`, engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set(`view engine`, `handlebars`)
app.set(`views`, `./src/views`)

//endpoints
app.use("/", productRouter)
app.use("/", cartsRouter)
app.use(`/`, realtimeproductsRouter)

server.listen(PORT, ()=>console.log(`escuchando en el ${PORT}`))
