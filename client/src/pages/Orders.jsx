import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, MapPin, CreditCard, Clock, CheckCircle, XCircle, ArrowLeft, ShoppingBag, User, Phone, Mail } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/orders/all`);
        setOrders(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [baseURL]);

  console.log(orders)

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`${baseURL}/api/orders/status`, {
        orderId,
        status: newStatus,
      });

      if (res.data.success) {
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Shipped': 'bg-purple-100 text-purple-800 border-purple-200',
      'Delivered': 'bg-green-100 text-green-800 border-green-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Processing': return <Package className="w-4 h-4" />;
      case 'Shipped': return <Package className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="mt-2 text-gray-600">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} to manage
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Orders will appear here when customers place them</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
                        <p className="text-sm text-gray-500">User ID: {order.uid}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right flex gap-2 items-center">
                        <p className="text-xl font-bold text-gray-900">₹{order.amount?.toLocaleString()}</p>
                        <div className="flex items-center space-x-2">
                         
                          <span className={`text-sm font-medium ${order.payment === true ? 'text-green-600' : 'text-red-600'}`}>
                            {order.payment ? 'Paid' : 'Not Paid'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col-reverse gap-2 items-center space-x-2">
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(order.status || 'Pending')}`}>
                          {getStatusIcon(order.status || 'Pending')}
                          <span>{order.status || 'Pending'}</span>
                        </div>
                        <select
                          value={order.status || 'Pending'}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Shipping Address */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">Shipping Address</h4>
                      </div>
                      <div className="space-y-2 text-base">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{order.address?.firstname} {order.address?.lastname}</span>
                        </div>
                        <p className="text-gray-600 ml-6">{order.address?.street}</p>
                        <p className="text-gray-600 ml-6">{order.address?.city}, {order.address?.state} - {order.address?.pincode}</p>
                        <p className="text-gray-600 ml-6">{order.address?.country}</p>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{order.address?.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{order.address?.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <ShoppingBag className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">Order Items ({order.items.length})</h4>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.productId.image[0]}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{item.productId.name}</p>
                              <p className="text-sm text-gray-500">Size: {item.size}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-gray-500"> Price: ₹{item.productId.price?.toLocaleString()}</span>
                                <span className="text-sm font-semibold text-gray-900">
                                 Total :  ₹{(item.quantity * item.productId.price)?.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;