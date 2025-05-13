
import express from "express";
import Cart from '../models/cart.model.js';
import Product from "../models/productos.js";

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
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

        const productInCart = cart.products.find(p => p.product.toString() === pid);

        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }
        await cart.save();
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({status: "error", message: `Error al actualizar el carrito`
        });
    }
});

cartsRouter.get("/api/carts/:cid", async (req, res) => {
    const cid = req.params.cid
    try {
        const carro = await Cart.findById(cid).populate("products.product")
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
// borrar 1 del carro
cartsRouter.delete("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        const { cid , pid} = req.params
        const cart = await Cart.findById(cid)
        const array = cart.products
        if(array.some(p=>p.product.toString()===pid)){
            let pi = array.findIndex(p=>p.product.toString()===pid)
            array.splice(pi, 1)
            await cart.save()
            res.json({ status: 'success', message: 'Producto eliminado del carrito' })
        } else{
            res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carro' })
        }

    } catch (error) {
        res.status(404).json({ status: 'error', message: 'Error al eliminar' })
    }
    
    
})
cartsRouter.put("api/carts/:cid/products/:pid", async (req, res) => {
    try {
        const { cid , pid} = req.params
        const cart = await Cart.findById(cid)
        const array = cart.products
        if(array.some(p=>p.product.toString()===pid)){
            let pi = array.findIndex(p=>p.product.toString()===pid)
            array[pi].quantity = req.body.quantity
            await cart.save()
            res.json({ status: 'success', message: 'Producto actualizado en el carrito' })
        } else{
            res.status(500).json({ status: 'error', message: 'Error al actualizar el producto del carro' })
        }
    } catch (error) {
        res.status(404).json({ status: 'error', message: 'Error al actualizar' })
    }
    
})
cartsRouter.delete("/api/carts/:cid", async (req, res) => {
    try { 
        const cid = req.params.cid
        const carro = await Cart.findById(cid)
        carro.products = []
        await carro.save()
        res.status(200).json({status: "success", payload: carro})
    } catch (error) {
        res.status(404).json({status: "error", message: `error al buscar el carro`})
    }
})
export default cartsRouter
