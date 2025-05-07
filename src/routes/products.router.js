import express from 'express';
import Product from '../models/productos.js';

const productRouter = express.Router()


productRouter.get("/products", async(req, res)=>{
    const list = await Product.find()
    res.render(`home`, {list})
})
productRouter.get("/api/products/:pid", async(req, res)=>{
    const pid = req.params.pid
    try {
        const producto = await Product.findById(pid)
        res.status(200).json({status: "sucsess", payload: producto })
    } catch (error) {
        res.status(404).json({status: "eror", message: `error al encontrar el produccto ${pid}`})
    }

})
productRouter.post("/api/products", async(req, res)=>{
    const producto = req.body
    try {
        const newProduct = new Product(producto)
        await newProduct.save()
        res.status(201).json({status: "sucsess", payload: newProduct })
    } catch (error) {
        res.status(404).json({status: "eror", message: `error al crear el producto ${producto}`})
    }

})
productRouter.put("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    const updates = req.body
    try {
        const updatedProduct = await Product.findByIdAndUpdate(pid, updates,{new: true, runValidators: true})
        res.status(200).json({status: "sucsess", payload: updatedProduct })
    } catch (error) {
        res.status(404).json({status: "eror", message: `error al modificar el producto ${pid}`})
    }
})
productRouter.delete("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    try {
        let pd = await Product.findByIdAndDelete(pid)
        res.status(200).json({status: "sucsess", payload: `se borro el producto ${pd}` })
    } catch (error) {
        res.status(404).json({status: "eror", message: `error al encontrar el produccto ${pid}`})
    }
})
export default productRouter