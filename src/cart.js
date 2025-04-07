import fs from "fs"
export class Carro{
    constructor(){
        this.path = "./src/carts.json"
    }
    newId = (c) => {
        if (c.length > 0){
            return c[c.length - 1].id +1
        }else{
            return 1
        }
    }
    addCart = async () => {
        const cartjson = await fs.promises.readFile(this.path, "utf-8")
        const cartList = JSON.parse(cartjson)
        let id = this.newId(cartList)
        let newCart = {id, products: []}
        cartList.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(cartList, null, 2), "utf-8")
        return newCart
    }
    getCart = async () => {
        const cartjson = await fs.promises.readFile(this.path, "utf-8")
        const cartList = JSON.parse(cartjson)
        return cartList
    }
    getCartById = async (cid) => {
        const cartjson = await fs.promises.readFile(this.path, "utf-8")
        const cartList = JSON.parse(cartjson)
        let cart = cartList.find(c=>c.id===Number(cid))
        return cart

    }
    addProductInCart = async (cid, pid, quantityObj) => {
        const cartjson = await fs.promises.readFile(this.path, "utf-8");
        const cartList = JSON.parse(cartjson);
    
        const cartIndex = cartList.findIndex(c => c.id === Number(cid));
        if (cartIndex === -1) {
            console.log("Carrito no encontrado");
            return null;
        }
    
        const cart = cartList[cartIndex];
        const productIndex = cart.products.findIndex(p => p.id === Number(pid));
        const quantity = quantityObj.quantity;     
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ id: Number(pid), quantity });
        }
        await fs.promises.writeFile(this.path, JSON.stringify(cartList, null, 2), "utf-8");
        return cart;
    };
    
}