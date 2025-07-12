import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { Edit, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ViewProducts = () => {
  const { productData, fetchProducts } = useProductStore();
   const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async(id)=>{
    try {
     const res = await axios.delete(`${baseURL}/api/product/${id}`)
      toast.success(res.data.message)
      fetchProducts();
      
    } catch (error) {
      console.log(error);
    }

  }

  if (productData.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          You Dont added Any products
        </h3>
        <p className="text-gray-500 mb-6">Start add items</p>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="cursor-pointer px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">All Products</h1>
        <button
          onClick={() => {
            navigate("/admin/add-product");
          }}
          className="bg-indigo-600 text-white cursor-pointer px-4 py-2 rounded w-full sm:w-auto"
        >
          Add Product
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <label htmlFor="name" className="w-full sm:w-auto">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Search Products"
            className="w-full sm:w-auto border bg-white border-gray-300 px-4 py-2 rounded-lg"
          />
        </label>

        <select
          name="category"
          id="category"
          className="w-full sm:w-auto border bg-white border-gray-300 px-4 py-2 rounded-lg"
        >
          <option value="">Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div>
        <div className="hidden md:block">
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="w-full bg-white">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase ">
                    Product
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase ">
                    Category
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase ">
                    Price
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-gray-700 uppercase ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productData.map((product, item) => (
                  <tr
                    key={item}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image[0]}
                          alt="product"
                          className="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-200"
                        />
                        <h2 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h2>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-900 uppercase">
                      {product.category}
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-900">
                      ₹{product.price}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* <button className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200">
                          <Edit size={14} />
                          Edit
                        </button> */}
                        <button onClick={()=>{handleDelete(product._id)}} className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:border-red-300 transition-colors duration-200">
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="md:hidden space-y-4">
          {productData.map((product, index) => (
            <div key={index} className="border rounded-lg border-gray-300 bg-white shadow-sm">
              <div className="aspect-square w-full overflow-hidden rounded-t-lg">
                <img 
                  src={product.image[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">{product.name}</h2>
                <p className="space-x-3 mb-2">{product.sizes.map((size,index)=>(
                  <span className="bg-gray-100 px-1" key={index}>{size} </span>
                ))}</p>
                <p className="text-sm uppercase text-indigo-600 font-medium mb-2">{product.category}</p>
                <p className="text-xl font-bold text-gray-900 mb-4">₹{product.price}</p>
                <div className="flex gap-2">
                  {/* <button className="cursor-pointer flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200 flex-1">
                    <Edit size={16} /> 
                    Edit
                  </button> */}
                  <button 
                    onClick={()=>{handleDelete(product._id)}} 
                    className="cursor-pointer flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:border-red-300 transition-colors duration-200 flex-1"
                  >
                    <Trash2 size={16} /> 
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;