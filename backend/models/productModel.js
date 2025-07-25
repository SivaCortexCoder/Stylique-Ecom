import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description1: {type:String, required:true},
    description2: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:Array, required:true},
    category: {type:String, required:true},
    subCategory: {type:String, required:true},
    sizes: {type:Array, required:true},
    date: {type:Number, required:true},

})

const productModel = mongoose.model.product || mongoose.model("product",productSchema)

export default productModel;