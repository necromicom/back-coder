import express from "express"
import { Product } from '../prod.js'

const realtimeproductsRouter = express.Router()
const product = new Product()
realtimeproductsRouter.use(express.json())

realtimeproductsRouter.get("/realtimeproducts", async(req, res)=>{
    const list = await product.getProduct()
    res.render(`realtimeproducts`, {list})
})

export default realtimeproductsRouter