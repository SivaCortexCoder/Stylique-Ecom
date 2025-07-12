import { useCartStore } from '../store/useCartStore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase/firebaseConfig';
import { toast } from "react-toastify";
import { ArrowLeft, ShoppingBag, Trash, Trash2, Lock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
   
    const [user, setUser] = useState(null);
    const { cart, fetchCart, removeFromcart, updateCartItem,getSubtotal } = useCartStore();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchCart(currentUser.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleRemoveFromCart = async (productId, size) => {
        if (!user) return;

        try {
            await removeFromcart({ uid: user.uid, productId, size });
            toast.success("Removed");
        } catch (error) {
            console.error("Error removing from cart:", error);
            toast.error("Error removing from cart");
        }
    };
    console.log(cart)

    const handleUpdateQuantity = async (productId, size, newQuantity) => {
        if (!user || newQuantity < 1) return;

        try {
            await updateCartItem({
                uid: user.uid,
                productId,
                size,
                quantity: newQuantity,
            });
            toast.success("Quantity updated");
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Error updating quantity");
        }
    };

    const subtotal = getSubtotal()

    return (
        <div className="min-h-screen bg-gray-50 py-8 my-17">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <p className="mt-2 text-gray-600">
                        {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                        <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
                        <button onClick={() => navigate('/collections')} className="cursor-pointer px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 lg:w-2/3">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="hidden md:flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                                    <div className="flex-1">Product</div>
                                    <div className="w-20 text-center">Qty</div>
                                    <div className="w-24 text-center">Price</div>
                                    <div className="w-24 text-center">Total</div>
                                    <div className="w-16"></div>
                                </div>

                                <div>
                                    {cart.map((product, index) => (
                                        <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="hidden md:flex items-center justify-between">
                                                <div className="flex items-center space-x-4 flex-1">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                                        <img src={product.productId.image[0]} alt={product.productId.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">{product.productId.name}</h3>
                                                        <p className="text-sm text-gray-500">Size: {product.size || "N/A"}</p>
                                                    </div>
                                                </div>
                                                <div className="w-20 flex justify-center items-center space-x-2">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(product.productId._id, product.size, product.quantity - 1)}
                                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                        disabled={product.quantity <= 1}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="min-w-[24px] text-center">{product.quantity}</span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(product.productId._id, product.size, product.quantity + 1)}
                                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="w-24 text-center font-medium">₹{product.productId.price}</div>
                                                <div className="w-24 text-center font-semibold text-gray-900">₹{product.quantity * product.productId.price}</div>
                                                <div className="w-16 flex justify-center">
                                                    <button
                                                        onClick={() => handleRemoveFromCart(product.productId._id, product.size)}
                                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                                                    >
                                                        <Trash className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="md:hidden">
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                                        <img src={product.productId.image[0]} alt={product.productId.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900">{product.productId.name}</h3>
                                                        <p className="text-sm text-gray-500">Size: {product.size || "N/A"}</p>
                                                        <div className="flex items-center mt-1 space-x-2">
                                                            <button
                                                                onClick={() => handleUpdateQuantity(product.productId._id, product.size, product.quantity - 1)}
                                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                                disabled={product.quantity <= 1}
                                                            >
                                                                −
                                                            </button>
                                                            <span>{product.quantity}</span>
                                                            <button
                                                                onClick={() => handleUpdateQuantity(product.productId._id, product.size, product.quantity + 1)}
                                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveFromCart(product.productId._id, product.size)}
                                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <div className="mt-3 flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">₹{product.productId.price} each</span>
                                                    <span className="font-semibold text-gray-900">₹{product.quantity * product.productId.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <button onClick={() => navigate('/collections')} className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Continue Shopping
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>


                                <div className="border-t border-gray-200 pt-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="font-medium text-green-600">0.00</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <div className="flex justify-between">
                                                <span className="text-lg font-semibold text-gray-900">Total</span>
                                                <span className="text-lg font-semibold text-gray-900">₹{subtotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => navigate('/place-order')} className="w-full cursor-pointer mt-6 py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                                    Proceed to checkout
                                </button>

                                <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                                    <Lock className="w-3 h-3 mr-1" />
                                    Secure checkout
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
