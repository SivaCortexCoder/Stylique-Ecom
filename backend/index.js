import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


const app = express()

//middlewares
app.use(cors())
app.use(express.json())

//database connection 
connectDB()

//coludinary connection
connectCloudinary()


const PORT = process.env.PORT || 3000

app.use('/api/product',productRouter)

app.use('/api/user',userRouter)

app.use('/api/cart',cartRouter)

app.use('/api/orders',orderRouter)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})