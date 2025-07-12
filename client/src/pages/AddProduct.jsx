import React, { useState } from "react";
import { Image } from "lucide-react";
import uploadImg from "../assets/images/upload_area.png";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [sizes, setSizes] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description1: "",
    description2: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description1", formData.description1);
      data.append("description2", formData.description2);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("subCategory", formData.subCategory);
      data.append("sizes", JSON.stringify(sizes));

      image1 && data.append("image1", image1);
      image2 && data.append("image2", image2);
      image3 && data.append("image3", image3);
      image4 && data.append("image4", image4);

      const result = await axios.post(`${baseURL}/api/product/add`, data);

      toast.success(result.data.message);

      setFormData({
        name: "",
        description1: "",
        description2: "",
        price: "",
        category: "",
        subCategory: "",
        sizes: [],
      });
      setSizes([]);
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white max-w-[95%] md:max-w-[85%] xl:max-w-5xl mx-auto shadow-md p-7 space-y-5 rounded-lg "
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label htmlFor="image1">
              <img
                src={!image1 ? uploadImg : URL.createObjectURL(image1)}
                alt=""
                className="cursor-pointer w-full h-40 object-cover rounded-lg border border-gray-200 "
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div>
            <label htmlFor="image2">
              <img
                src={!image2 ? uploadImg : URL.createObjectURL(image2)}
                alt=""
                className="cursor-pointer w-full h-40 object-cover rounded-lg border border-gray-200"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div>
            <label htmlFor="image3">
              <img
                src={!image3 ? uploadImg : URL.createObjectURL(image3)}
                alt=""
                className="cursor-pointer w-full h-40 object-cover rounded-lg border border-gray-200 "
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div>
            <label htmlFor="image4">
              <img
                src={!image4 ? uploadImg : URL.createObjectURL(image4)}
                alt=""
                className="cursor-pointer w-full h-40 object-cover rounded-lg border border-gray-200 "
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>

        <div className="grid">
          <label htmlFor="productName" className="font-medium">
            Product Name <span className="text-red-600">*</span>
          </label>
          <input
            onChange={handleInputChange}
            value={formData.name}
            id="productName"
            name="name"
            type="text"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="e.g. Premium Cotton T-shirt"
          />
        </div>

        <div className="grid">
          <label htmlFor="price" className="font-medium">
            Price <span className="text-red-600">*</span>
          </label>
          <input
            onChange={handleInputChange}
            value={formData.price}
            id="price"
            name="price"
            type="number"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="₹ 500"
          />
        </div>

        <div className="md:flex gap-2 items-center">
          <div className="grid flex-1">
            <label htmlFor="category">
              Category <span className="text-red-600">*</span>
            </label>
            <select
               onChange={handleInputChange}
              value={formData.category}
              name="category"
              id="category"
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value=""></option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="grid flex-1">
            <label htmlFor="subcategory">
              Sub Category <span className="text-red-600">*</span>
            </label>
            <select
              onChange={handleInputChange}
              value={formData.subCategory}
              name="subCategory"
              id="subcategory"
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value=""></option>
              <option value="shirt">Shirt</option>
              <option value="t-shirts">T-Shirts</option>
              <option value="top">Tops</option>
              <option value="pant">Pants</option>
            </select>
          </div>
        </div>

        <div className="grid">
          <label htmlFor="sizes">
            Sizes <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-3">
            {sizeOptions.map((size) => (
              <div
                key={size}
                onClick={() => toggleSize(size)}
                className={`${
                  sizes.includes(size) ? "bg-indigo-200" : "bg-gray-100"
                } px-3 py-1 cursor-pointer rounded`}
              >
                <p>{size}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid">
          <label htmlFor="shortdescription">
            Short Description <span className="text-red-600">*</span>
          </label>
          <textarea
            onChange={handleInputChange}
            value={formData.description1}
            name="description1"
            id="shortdescription"
            rows={2}
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="A lightweight, usually knitted"
          ></textarea>
        </div>
        <div className="grid">
          <label htmlFor="fulldescription">
            Full Description <span className="text-red-600">*</span>
          </label>
          <textarea
            onChange={handleInputChange}
            value={formData.description2}
            name="description2"
            id="fulldescription"
            placeholder="Perfect for walking, running errands, and casual wear. "
            rows={5}
            className="border border-gray-300 rounded px-4 py-2"
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer  "
          >
            Add Product
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer "
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
