import express from "express"
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.post("/place",placeOrder)

orderRouter.post("/verify", verifyOrder);

orderRouter.get('/all',listOrders)

orderRouter.get("/user/:id",userOrders)

orderRouter.put("/status",updateStatus)



export default orderRouter