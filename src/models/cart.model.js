import mongoose from "mongoose";
const cartsSchema = mongoose.Schema({
    products:{
        type: [
            {
                product:{type: mongoose.Schema.Types.ObjectId, ref: "product"},
                quantity: Number
            },
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Cart = mongoose.model("Cart", cartsSchema)
export default Cart