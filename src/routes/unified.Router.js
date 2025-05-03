import express from "express";
import Product from '../models/productos.js'
const unifiedRouter = express.Router()
unifiedRouter.get("/", async (req, res) => {
    const pl = await Product.find()
    res.status(200).render(`united`, {pl})
})
export default unifiedRouter