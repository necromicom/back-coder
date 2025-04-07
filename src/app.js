import { Product } from './prod.js'
import express from 'express';
import { Carro } from './cart.js';


const app = express();
const PORT = 8080
app.use(express.json())
const product = new Product()
const cart = new Carro()
//getProducts
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
    res.send(await product.addProduct(producto))
})
//actualizar producto
app.put("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    const updates = req.body
    res.send(await product.actProd(pid, updates))
})
//delete product
app.delete("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    res.send(await product.borrarProd(pid))
})
//crear carro
app.post("/api/carts", async (req, res) => {
    try {
        const newCart = await cart.addCart()
        res.status(201).send(newCart)
    } catch (err) {
        console.error("Error al crear el carrito:", err)
        res.status(500).send({ error: "Error al crear el carrito" })
    }
})
//add2Cart
app.post("/api/carts/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body

    res.send(await cart.addProductInCart(cid, pid, quantity))
})
//getCartById
app.get("/api/carts/:cid", async (req, res) => {
    const cid = req.params.cid
    res.send(await cart.getCartById(cid))
})
app.get("/api/carts", async (req, res) => {
    res.send(await cart.getCart())
})
app.listen(PORT, ()=>console.log(`escuchando en el ${PORT}`))