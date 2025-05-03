import express from 'express';
import { Product } from '../prod.js'

const productRouter = express.Router()
const product = new Product()

productRouter.get("/products", async(req, res)=>{
    const list = await product.getProduct()
    res.render(`home`, {list})
})
productRouter.get("/api/products/:pid", async(req, res)=>{
    const pid = req.params.pid
    res.send(await product.getProductById(pid)).status(200)
})
productRouter.post("/api/products", async(req, res)=>{
    const producto = req.body
    res.send(await product.addProduct(producto))
})
productRouter.put("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    const updates = req.body
    res.send(await product.actProd(pid, updates))
})
productRouter.delete("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    res.send(await product.borrarProd(pid))
})
export default productRouter