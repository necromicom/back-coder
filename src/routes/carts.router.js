import { Carro } from '../cart.js';
import express from "express";

const cart = new Carro()
const cartsRouter = express.Router()
cartsRouter.use(express.json())
cartsRouter.post("/api/carts", async (req, res) => {
    try {
        const newCart = await cart.addCart()
        res.status(201).send(newCart)
    } catch (err) {
        console.error("Error al crear el carrito:", err)
        res.status(500).send({ error: "Error al crear el carrito" })
    }
})
cartsRouter.post("/api/carts/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body

    res.send(await cart.addProductInCart(cid, pid, quantity))
})
cartsRouter.get("/api/carts/:cid", async (req, res) => {
    const cid = req.params.cid
    res.send(await cart.getCartById(cid))
})
cartsRouter.get("/api/carts", async (req, res) => {
    res.send(await cart.getCart())
})
export default cartsRouter

// //crear carro
// app.post("/api/carts", async (req, res) => {
//     try {
//         const newCart = await cart.addCart()
//         res.status(201).send(newCart)
//     } catch (err) {
//         console.error("Error al crear el carrito:", err)
//         res.status(500).send({ error: "Error al crear el carrito" })
//     }
// })
// //add2Cart
// app.post("/api/carts/:cid/product/:pid", async (req, res) => {
//     const cid = req.params.cid
//     const pid = req.params.pid
//     const quantity = req.body

//     res.send(await cart.addProductInCart(cid, pid, quantity))
// })
// //getCartById
// app.get("/api/carts/:cid", async (req, res) => {
//     const cid = req.params.cid
//     res.send(await cart.getCartById(cid))
// })
// app.get("/api/carts", async (req, res) => {
//     res.send(await cart.getCart())
// })

