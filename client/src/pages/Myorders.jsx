import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

const Myorders = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [myOrders, setMyOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchData(currentUser.uid);
      } else {

        navigate('/login')
        
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async (uid) => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/api/orders/user/${uid}`);
      setMyOrders(res.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 animate-pulse text-xl">Loading your orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 pb-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Orders</h1>

        {myOrders.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-md text-center">
            <p className="text-gray-500 mb-4">You haven’t placed any orders yet.</p>
            <Link to="/collections">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {myOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex flex-col gap-4"
              >
                <div className="flex justify-between items-center border-gray-300 border-b pb-3">
                  <div>
                    <p className="font-semibold text-gray-800">Order #{order._id.slice(-8)}</p>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img
                      src={item.productId.image[0]}
                      alt={item.productId.name}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                    />
                    <div className="flex flex-col justify-between">
                      <h2 className="font-semibold text-gray-800">{item.productId.name}</h2>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-800 font-semibold">Price: ₹{item.productId.price}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-300 pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-700">
                  <div>
                    <p className="font-medium">Total Amount: ₹{order.amount}</p>
                    <p className={`${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                      {order.payment ? 'Paid' : 'Pending Payment'}
                    </p>
                  </div>
                  <Link to="/collections">
                    <button className="mt-3 sm:mt-0 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                      Shop More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Myorders;
