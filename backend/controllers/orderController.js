import orderModel from "../models/orderModel.js"
import crypto from 'crypto'
import Razorpay from "razorpay"
import { sendOrderConfirmation } from "../utility/sendEmail.js"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const placeOrder = async (req, res) => {
    const { uid, items, amount, address } = req.body;

    // Validate required fields
    if (!uid || !items || !amount || !address) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required fields" 
        });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ 
            success: false, 
            message: "Cart is empty" 
        });
    }

    // Validate amount
    if (amount <= 0) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid amount" 
        });
    }

    try {
        const newOrder = new orderModel({
            uid: uid,
            items: items,
            amount: amount,
            address: address,
            payment: false,
        });

        await newOrder.save();

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${newOrder._id}`,
            payment_capture: 1
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.json({
            success: true,
            orderId: newOrder._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
        });

    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Order creation failed",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export const verifyOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing payment verification data" 
        });
    }

    try {
        // Generate expected signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature === razorpay_signature) {
            
            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId, 
                { 
                    payment: true,
                    razorpayPaymentId: razorpay_payment_id,
                    razorpayOrderId: razorpay_order_id
                },
                { new: true }
            );

            if (!updatedOrder) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Order not found" 
                });
            }

            const user = await userModel.findOne({ uid: updatedOrder.uid });
            if (user?.email) {
             await sendOrderConfirmation(user.email, updatedOrder._id);
    }

            res.json({ 
                success: true, 
                message: "Payment verified successfully",
                order: updatedOrder 
            });
        } else {
            // Invalid signature - delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.status(400).json({ 
                success: false, 
                message: "Invalid payment signature" 
            });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Payment verification failed",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const userOrders = async (req, res) => {
    const { id } = req.params;
     const uid = id;  

    if (!uid) {
        return res.status(400).json({ 
            success: false, 
            message: "User ID is required" 
        });
    }

    try {
        const orders = await orderModel.find({ uid: uid }).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Fetch user orders error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch orders",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("List Orders Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Could not list orders",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const updateStatus = async (req, res) => {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
        return res.status(400).json({ 
            success: false, 
            message: "Order ID and status are required" 
        });
    }

    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ 
                success: false, 
                message: "Order not found" 
            });
        }

        res.json({ 
            success: true, 
            message: "Order status updated successfully",
            order: updatedOrder 
        });
    } catch (error) {
        console.error("Status Update Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update status",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};