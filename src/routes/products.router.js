import express from 'express';
import Product from '../models/productos.js';

const productRouter = express.Router()


productRouter.get("/api/products", async(req, res)=>{
    try {
        const { limit = 10, page = 1} = req.query
        const result = await Product.paginate({}, {limit, page})
        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage
                ? `/api/products?limit=${limit}&page=${result.prevPage}`
                : null,
            nextLink: result.hasNextPage
                ? `/api/products?limit=${limit}&page=${result.nextPage}`
                : null
            });
    } catch (error) {
        res.status(404).json({status: "error", message: `error al recuperar los productos`})
    }
    
})
productRouter.get("/api/products/:pid", async(req, res)=>{
    try {
        const pid = req.params.pid
        const producto = await Product.findById(pid)
        res.json({ status: 'success', producto })
    } catch (error) {
        res.status(404).json({status: "error", message: `error al encontrar el producto ${pid}`})
    }

})
productRouter.post("/api/products", async(req, res)=>{
    const producto = req.body
    try {
        const newProduct = new Product(producto)
        await newProduct.save()
        res.status(201).json({status: "success", payload: newProduct })
    } catch (error) {
        res.status(500).json({status: "error", message: `error al crear el producto ${producto}`})
    }

})
productRouter.put("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    const updates = req.body
    try {
        const updatedProduct = await Product.findByIdAndUpdate(pid, updates,{new: true, runValidators: true})
        res.status(200).json({status: "success", payload: updatedProduct })
    } catch (error) {
        res.status(404).json({status: "error", message: `error al modificar el producto ${pid}`})
    }
})
productRouter.delete("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid
    try {
        let pd = await Product.findByIdAndDelete(pid)
        res.status(200).json({status: "success", payload: `se borro el producto ${pd}` })
    } catch (error) {
        res.status(404).json({status: "error", message: `error al encontrar el produccto ${pid}`})
    }
})
export default productRouter