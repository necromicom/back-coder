import mongoose from "mongoose";
const p =  new mongoose.Schema({
    title: {
        type: String, required:  true
    },
    description: {
        type: String, required: false
    },
    price:{
        type: Number, required: true
    },
    thumbnail: {
        type: String, required: false
    },
    code: {
        type: String, required: true
    },
    stock: {
        type: Number, required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
const Product = mongoose.model("product", p)
export default Product