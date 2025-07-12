import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useProductStore } from '../store/useProductStore';
import axios from "axios";
import { useCartStore } from "../store/useCartStore";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

const ProductDetails = () => {
  // const { productData } = useProductStore();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const { id } = useParams();

  const {addToCart} = useCartStore()
  const [user, setUser] = useState(null)

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
  });
  return () => unsubscribe();
}, []);


const handleAddToCart = () => {
  if (!user) {
    toast.warning("Please login first to add to cart.");
    return;
  }

  try {
      addToCart({
    uid: user.uid,
    productId: productselected._id,
    quantity: 1,
    size: selectedSize,
  });
  toast.success("Added to cart")
    
  } catch (error) {
    toast.error(error)
  }

};

  const [productselected, setProductSelected] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/product/${id}`);
      setProductSelected(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const product = productData.find(product=> product._id === id)
    // product && setProductSelected(product)
    fetchProduct();
  }, [id]);

  return (
    productselected && (
      <div className="my-20 p-5 max-w-6xl mx-auto">
        <p className="text-center mb-5">
          Collections / {productselected.category} / <span className="text-indigo-500">{productselected.subCategory}
          </span>
        </p>
        <div className="flex flex-col md:flex-row gap-10 ">
          <div className="flex flex-col gap-2 md:flex-row-reverse md:flex-1 md:min-w-0">
            <div className="flex-1">
              <img
                src={productselected.image[selectedImage]}
                className="w-full h-full object-cover rounded-md"
                alt=""
              />
            </div>
            <div className="flex gap-2 md:flex-col">
              {productselected.image.map((image, index) => (
                <img
                  onClick={() => setSelectedImage(index)}
                  key={index}
                  src={image}
                  alt=""
                  className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-md cursor-pointer
                ${
                  selectedImage === index
                    ? " border-2 border-indigo-500 opacity-100"
                    : "border-gray-300 opacity-70 hover:opacity-100"
                } `}
                />
              ))}
            </div>
          </div>

          <div className="md:flex-1 space-y-6 ">
            <div className="space-y-2">
              <div className="mt-5">
                <h1 className="text-2xl  font-medium">
                  {productselected.name.charAt(0).toUpperCase() +
                    productselected.name.slice(1).toLowerCase()}
                </h1>
                <p>
                  {productselected.category} • <span className="text-indigo-500">
                    {productselected.subCategory}
                  </span>
                </p>
              </div>

              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
                ₹{productselected.price}
              </h1>
              <p className="text-gray-500 mt-5 ">
                {productselected.description1}
              </p>
              <div className="mt-5 space-y-2  ">
                <p className="text-indigo-500">Select Size</p>
                <div className="space-x-3">
                  {productselected.sizes.map((size, index) => (
                    <button
                      onClick={() => setSelectedSize(size)}
                      key={index}
                      className={`border border-gray-400 bg-gray-100 px-4 py-1.5 cursor-pointer
                    ${
                      selectedSize === size
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400 hover:bg-gray-100"
                    }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <button
              onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`bg-black text-white px-4 py-3 cursor-pointer mt-10 hover:scale-105 transition ease-in-out 
                  ${!selectedSize ? "opacity-50 " : ""}`}
              >
                ADD TO CART
              </button>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  100% Original product
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Cash on delivery is available on this product
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Easy return and exchange policy within 7 days
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Description
          </h2>
          <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <p className="text-gray-700 leading-relaxed">
              {productselected.description2}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
