import express from 'express'
import { addToCart, clearCart, getCartItems, removeFromCart, updateCartItem } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/add',addToCart)

cartRouter.get('/:uid',getCartItems)

cartRouter.put('/update',updateCartItem)

cartRouter.delete('/remove',removeFromCart)

cartRouter.delete('/clear', clearCart)

export default cartRouter;