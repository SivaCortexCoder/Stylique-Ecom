import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ name, price, image, id }) => {
  return (
    <Link to={`/collections/product/${id}`} className="block">
      <div className="border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <img
          src={image}
          alt={name}
          className="w-full rounded-t-lg object-cover"
        />
        <div className="p-3">
          <h3 className="font-medium text-sm md:text-base text-gray-800 mb-1">
            {name}
          </h3>
          <p className="font-semibold text-sm md:text-base">₹ {price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
