import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true

    },
    quantity:{type:Number,default:1},
    size:{type:String}
})

const userSchema = new mongoose.Schema({
    uid:{type:String ,required:true,unique:true},
    email:{type:String,required:true},
    cart:[cartSchema],
    // orders:[{type:Object}],
    isAdmin: { type: Boolean, default: false },
})

const userModel = mongoose.model.user || mongoose.model("user",userSchema)

export default userModel