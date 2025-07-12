import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import razorpayimg from '../assets/images/razorpay_logo.png' 
import stripe_logo from '../assets/images/stripe_logo.png'
import axios from "axios";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { cart, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      }
    })
    return () => unsubscribe();
  }, [])

  const handleFormData = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleRazorpayPayment = async () => {
    // Check if user is authenticated
    if (!user) {
      toast.error("Please login to place order");
      return;
    }

    
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

   
    const requiredFields = ['firstname', 'lastname', 'email', 'street', 'city', 'state', 'pincode', 'country', 'phone'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error("Please fill all delivery information fields");
      return;
    }

    setLoading(true);

    try {
     
      const res = await axios.post(`${baseURL}/api/orders/place`, {
        uid: user.uid,
        items: cart,
        amount: subtotal,
        address: formData
      });

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to create order");
      }

      const { razorpayOrderId, amount, currency, key, orderId } = res.data;

      // Razorpay payment options
      const options = {
        key,
        amount,
        currency,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyRes = await axios.post(`${baseURL}/api/orders/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });

            if (verifyRes.data.success) {
              toast.success("Payment successful! Order placed successfully.");
              // Clear cart after successful payment
              await clearCart(user.uid);
              // Reset form
              setFormData({
                firstname: "",
                lastname: "",
                email: "",
                street: "",
                city: "",
                state: "",
                pincode: "",
                country: "",
                phone: ""
              });
              navigate("/my-orders");
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (verifyError) {
            console.error("Payment verification error:", verifyError);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.firstname + " " + formData.lastname,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#6366F1",
        },
        modal: {
          ondismiss: function() {
            toast.info("Payment cancelled by user");
            setLoading(false);
          }
        }
      };

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.error("Payment failed:", response.error);
        toast.error("Payment failed: " + response.error.description);
        setLoading(false);
      });

      rzp.open();
      setLoading(false);

    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="my-30 p-10">
      <div className="grid gap-24 lg:grid-cols-2 max-w-6xl mx-auto">
        <div className="">
          <h1 className="font-bold text-xl mb-6">Delivery Information</h1>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={formData.firstname}
                onChange={handleFormData}
                placeholder="First Name"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={handleFormData}
                placeholder="Last Name"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormData}
              placeholder="Email Address"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />

            <input
              id="street"
              name="street"
              type="text"
              value={formData.street}
              onChange={handleFormData}
              placeholder="Street"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleFormData}
                placeholder="City"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleFormData}
                placeholder="State"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                id="pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleFormData}
                placeholder="Pincode"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
              <input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleFormData}
                placeholder="Country"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleFormData}
              placeholder="Phone"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </form>
        </div>

        <div>
          <div>
            <h1 className="font-bold text-xl mb-6">Cart Total</h1>
            <div className="border-t border-gray-200 pt-6 bg-white rounded-lg p-4 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{subtotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-xl mt-9 mb-4">Payment Method</h1>
            <div className="flex justify-between border-t border-gray-200 pt-6 bg-white rounded-lg p-4 shadow-sm">
              <div>
                <button 
                  onClick={handleRazorpayPayment} 
                  disabled={loading}
                  className={`cursor-pointer rounded border border-indigo-500 p-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-50'}`}
                >
                  <img src={razorpayimg} alt="Razorpay" className="w-30" />
                  {loading && <span className="text-xs block mt-1">Processing...</span>}
                </button>
              </div>

              <div>
                <button className="cursor-pointer rounded border border-gray-300 p-2 opacity-50" disabled>
                  <img src={stripe_logo} alt="Coming Soon" className="w-30 " />
                  <span className="text-xs block mt-1">Coming Soon</span>
                </button>
              </div>
              
              <div>
                <button className="cursor-pointer rounded border border-gray-300 p-2 opacity-50" disabled>
                  <h2 className="font-semibold">Cash On Delivery</h2>
                  <span className="text-xs block mt-1">Coming Soon</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;