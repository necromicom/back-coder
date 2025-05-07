import fs from "fs"

export class ProductManager{
    constructor(){
        this.path = "./src/products.json"
    }
    newId = (p) => {
        if (p.length > 0){
            return p[p.length - 1].id +1
        }else{
            return 1
        }
    }
    getProduct = async () => {
        const prodjson =await fs.promises.readFile(this.path,"utf-8")
        const prodList = JSON.parse(prodjson)
        return prodList
    }
    addProduct = async (product) => {
        
        const prodjson = await fs.promises.readFile(this.path, "utf-8");
        const prodList = JSON.parse(prodjson);
        
        const { title, description, price, thumbnail, code, stock } = product;
        const codeExists = prodList.some(prod => prod.code === code);
        let id = this.newId(prodList);
        if (codeExists) {
            console.log(`El código ${code} ya existe.`);
            return null
        }
        const newProduct = { id, title, description, price, thumbnail, code, stock };
        prodList.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(prodList, null, 2), "utf-8");

        return newProduct;

    }
    getProductById = async (pid) => {

        const prodjson = await fs.promises.readFile(this.path, "utf-8");
        const prodList = JSON.parse(prodjson);
        let prod = prodList.find(p=>p.id===Number(pid));
        return prod
    }
    actProd = async (pid, updates) => {
        const prodjson = await fs.promises.readFile(this.path, "utf-8");
        const prodList = JSON.parse(prodjson);
        
        const index = prodList.findIndex(p => p.id ===Number(pid));
        if (index === -1) {
            console.log("Producto no existe");
            return null;
        }
        prodList[index] = { ...prodList[index], ...updates }
        await fs.promises.writeFile(this.path, JSON.stringify(prodList, null, 2), "utf-8");
        return prodList[index];
    }
    borrarProd = async (pid) => {
        const prodjson = await fs.promises.readFile(this.path, "utf-8");
        const prodList = JSON.parse(prodjson);
        const newList = prodList.filter(p => p.id !== Number(pid))
        if (newList.length === prodList.length) {
            console.log("Producto no encontrado");
            return console.log("Producto no encontrado");
        }
    
        await fs.promises.writeFile(this.path, JSON.stringify(newList, null, 2), "utf-8");
        console.log(`Producto con ID ${pid} eliminado`);
        return console.log(`Producto con ID ${pid} eliminado`);
        
    }
} 
