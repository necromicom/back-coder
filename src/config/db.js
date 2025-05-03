import mongoose from "mongoose";
const connectionDB = async()=>{
    try {
        await mongoose.connect("mongodb+srv://branca:dbatlaspass@cluster0.qfudb7e.mongodb.net/Product?retryWrites=true&w=majority&appName=Cluster0")
        console.log("conectado a db")
    } catch (error) {
        console.log("error al conectar")
    }
}
export default connectionDB