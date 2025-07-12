import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

//add product
export const addProduct =async (req,res)=>{
    try {
        const {name,description1,description2,price,category,subCategory,sizes} = req.body;
        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url

            })
        )

        const productData = {
            name,
            description1,
            description2,
            price:Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }

        const product = new productModel(productData)
        const savedProduct = await product.save()

        // console.log(name,description1,description2,price,category,subCategory,sizes)
        // console.log(imagesUrl)
        
        res.status(201).json({sucess:true,message:"Product Added"},{savedProduct})
    } catch (error) {
        console.log(error)
        res.json({sucess:false,message:error.message})
        
    }


}

//list all products 
export const listProduct = async(req,res)=>{
    try {
        const allProducts = await productModel.find()
        res.status(200).json({allProducts})
        
    } catch (error) {
        console.error('Error fetching product:', error);
         res.status(500).json({ message: 'Server error' });
    }

}


export const listSelectedProduct = async(req,res)=>{
    try {
        const{id} = req.params
        const selectedProduct = await productModel.findById(id)
        if (!selectedProduct) {
            return res.status(404).json({ message: 'Product not found' });
         }
        res.status(200).json(selectedProduct)


    } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ message: 'Server error' });

        
    }
}


export const deleteSelectedProduct = async(req,res)=>{
    try {
        const{id} = req.params
        const selectedProduct = await productModel.findByIdAndDelete(id)
        if (!selectedProduct) {
            return res.status(404).json({ message: 'Product not found' });
         }
         res.status(200).json({ message: 'Deleted Product' })
        
    } catch (error) {
        console.error('Error Deleting product:', error);
            res.status(500).json({ message: 'Server error' });
        
    }
    
}