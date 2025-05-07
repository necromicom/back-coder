import express from "express"

import Product from "../models/productos.js"

const realtimeproductsRouter = express.Router()

realtimeproductsRouter.use(express.json())

realtimeproductsRouter.get("/realtimeproducts", async(req, res)=>{
    const list = await Product.find()
    res.render(`realtimeproducts`, {list})
})

export default realtimeproductsRouter