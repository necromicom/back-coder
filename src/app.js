import { Product } from './prod.js'
import express from 'express';


const app = express();
const PORT = 8080
app.use(express.json())
const product = new Product()
//getPrpducts
app.get("/api/products", async(req, res)=>{
    res.send(await product.getProduct()).status(200)
})
//getProductId
app.get("/api/products/:pid", async(req, res)=>{
    const pid = req.params.pid
    res.send(await product.getProductById(pid)).status(200)
})
//post del product
app.post("/api/products", async(req, res)=>{
    const producto = req.body
    res.send(await product.addProduct(producto)).status(201)
})
//actualizar producto
app.put("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    const updates = req.body
    res.send(await product.actProd(pid, updates)).status(201)
})
//delete product
app.delete("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    res.send(await product.borrarProd(pid))
})
//crear carro
app.post("/api/carts/", async (req, res) => {
    

})
//add2Cart
app.post("/api/carts/:cid/product/:pid", async (req, res) => {
    
})
//getCart
app.get("/api/carts/:cid", async (req, res) => {
    
})
app.listen(PORT, ()=>console.log(`escuchando en el ${PORT}`))