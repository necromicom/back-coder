const ProductManager = function (title, description, price, thumbnail, code, stock, id){
    
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.code = code
    this.stock = stock
    this.id = id

};
const products = [];

let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

let p1 = new ProductManager("p1", "p1 des", 100.98 , "asd", 1234, 11, id)
products.push(p1)

function addProduct(){
    let titulo = prompt("ingrese titulo")
    let des = prompt("ingrese descripcion")
    let pri = parseFloat(prompt("ingrese precio"))
    let thum = prompt("ingrese imagen")
    let c = prompt("ingrese codigo")
    let st = parseInt(prompt("ingrese stock"))
    
    if (products.some((el) => el.title === titulo)){
        console.log("ya existe")
        return
    }
    if (titulo === "" || des === "" || isNaN(pri) || thum === "" || c  === "" || isNaN(st)){
        console.log("error al ingresar los datos")
        return
    }
    
    let producto = {
        title: titulo,
        description: des,
        price: pri,
        thumbnail: thum,
        code: c,
        stock: st,
        id: id
    }
    products.push(producto)
    id++
    console.log("Producto agregado:", producto)

};
function getProducts(){
    if (products.length > 0) {
        products.forEach((el) => console.log(el.title));
    } else {
        console.log("No hay productos.");
    }
}
function getProductById(num){
    let producto = products.find((el) => el.id === num);
    if (producto) {
        console.log(`El artículo buscado es: ${producto.title}`);
    } else {
        console.log("Not found");
    }
}
