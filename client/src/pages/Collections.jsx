import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useProductStore } from "../store/useProductStore";
import {Search} from 'lucide-react'

const Collections = () => {
  const { productData, fetchProducts } = useProductStore();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sort, setSort] = useState("relevant");
  const [search, setSearch] = useState('')

  

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
  ];

  const types = [
    { id: "shirt", label: "Shirts" },
    { id: "pant", label: "Pants" },
    { id: "top", label: "Tops" },
    { id: "t-shirts", label: "T-shirts" },
  ];

  const handleCategory = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  let filteredProducts = productData.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.toLowerCase());

    const typeMatch =
      selectedTypes.length === 0 ||
      selectedTypes.includes(product.subCategory.toLowerCase());

    const searchMatch = product.name.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && typeMatch && searchMatch;
  });

  if (sort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }



  return (
    <div className="min-h-screen w-full bg-white">
      <div className="my-30 px-4 sm:px-6 lg:px-8 max-w-[95%] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 ">
          
          <div className="w-full lg:w-1/4  ">
            <h1 className="text-xl font-semibold mb-6">Filters</h1>
            <div className="flex flex-wrap lg:flex-col gap-4">
              
              <div className="border border-gray-300 rounded p-5 text-gray-600 flex-1">
                <h2 className="mb-3 text-black font-semibold">Categories</h2>
                <div className="flex flex-col gap-3">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        value={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onChange={handleCategory}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span>{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              
              <div className="border border-gray-300 rounded p-5 text-gray-600 flex-1">
                <h2 className="mb-3 text-black font-semibold">Type</h2>
                <div className="flex flex-col gap-3">
                  {types.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        value={type.id}
                        checked={selectedTypes.includes(type.id)}
                        onChange={handleTypeChange}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span>{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

         
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">
                <span className="text-gray-500">All </span>
                <span className="text-black">Products</span>
                <span className="font-light text-md">({filteredProducts.length})</span>
              </h2>

              <select
                onChange={handleSort}
                value={sort}
                className="border rounded px-4 py-2 text-sm cursor-pointer"
              >
                <option value="relevant">Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            <div className="mb-5 relative">
              <label htmlFor="search"></label>
              <input onChange={(e)=>setSearch(e.target.value)} value={search} id="search" type="text" placeholder="Search for Shirts, T-Shirts..." className="border border-gray-300 px-4 py-2 rounded-xl w-full" />
              <Search className="absolute top-2 right-2 pr-1 text-gray-400"/>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500">No Products Found</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredProducts.map((item, index) => (
                  <Product
                    id={item._id}
                    key={index}
                    name={item.name}
                    price={item.price}
                    image={item.image[0]}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
