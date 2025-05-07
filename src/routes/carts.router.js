
import express from "express";
import Cart from '../models/cart.model.js';

const cartsRouter = express.Router()
cartsRouter.use(express.json())
cartsRouter.post("/api/carts", async (req, res) => {
    try {
        const newCart = new Cart()
        await newCart.save()
        res.status(201).json({status: "success", payload: newCart})
    } catch (err) {
        res.status(500).json({status: "error", message: `error al crear el carro`})
    }
})
cartsRouter.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body
        const updatedCart = await Cart.findByIdAndUpdate(cid, {$push:{products: {product: pid, quantity}}}, { new: true, runValidators: true})
        if (!updatedCart) return res.status(404).json({status: "error", message: `error al modificar el carro`})
        res.status(200).json({status: "success", payload: updatedCart})
    } catch (error) {
        res.status(404).json({status: "error", message: `error al actualizar el carro`})

    }
})
cartsRouter.get("/api/carts/:cid", async (req, res) => {
    const cid = req.params.cid
    try {
        const carro = await Cart.findById(cid)
        res.status(200).json({status: "success", payload: carro})

    } catch (error) {
        res.status(404).json({status: "error", message: `error al buscar el carro`})

    }
})
cartsRouter.get("/api/carts", async (req, res) => {
    try {
        const list = await Cart.find()
        res.status(200).json({status: "success", payload: list})
    } catch (error) {
        res.status(404).json({status: "error", message: `error al buscar los carros`})
    }
})
export default cartsRouter
