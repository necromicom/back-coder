import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
const p =  new mongoose.Schema({
    title: {
        type: String, required: true, unique: true
    },
    description: {
        type: String, required: false, index: "text"
    },
    price:{
        type: Number, required: true
    },
    thumbnail: {
        type: String, required: false, default: ""
    },
    code: {
        type: String, required: true
    },
    stock: {
        type: Number, required: true
    },
    category: {
        type: Array, required: false
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
p.plugin(paginate)
const Product = mongoose.model("product", p)
export default Product