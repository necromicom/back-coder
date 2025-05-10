import express from "express"
import Cart from "../models/cart.model.js"

import Product from "../models/productos.js"

const viewsRouter = express.Router()

viewsRouter.use(express.json())

//prod con ws
viewsRouter.get("/realtimeproducts", async(req, res)=>{
    const list = await Product.find()
    res.render(`realtimeproducts`, {list})
})
//prod comun
viewsRouter.get("/products", async (req, res) => {
    try {
        const { limit = 10, page = 1} = req.query
        const products = await Product.paginate({},{limit, page, lean: true})
        res.render("home", {products})
    } catch (error) {
        res.json({status: "error", message: `error: ${error.message}` })
    }
})
viewsRouter.get("/product/:pid", async (req, res) => {
    try {
        const pid = req.params.pid
        const product = await Product.findById(pid)
        res.render("producto", {product})
    } catch (error) {
        res.json({status: "error", message: `error: ${error.message}` })
    }
})
viewsRouter.get("/carts/:cid", async (req, res) => {
    try {
        const cid = req.params.cid
        const carro = await Cart.findById(cid).populate("products.product")
        res.status(200).render("cart" , {carro})
    } catch (error) {
        res.status(404).json({status: "error", message: `error al buscar el carro`})
    }
})
export default viewsRouter