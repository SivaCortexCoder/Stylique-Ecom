import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore';
import Product from './Product';
import { Link } from 'react-router-dom';

const LatestCollections = () => {
    const { productData, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className='mt-16 mb-20 '>
            {/* Header Section */}
            <div className='text-center mb-12'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
                    Trending Collections
                </h1>
                <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full'></div>
                <p className='text-gray-600 mt-4 text-lg max-w-2xl mx-auto px-4'>
                    Discover our handpicked selection of the most popular items this season
                </p>
            </div>

            {/* Products Grid */}
            <div className='max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 '>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
                    {productData.slice(0, 5).map((item, index) => (
                        <Link 
                            key={item._id} 
                            to={`/collections/product/${item._id}`} 
                            className='group block'
                        >
                            <div className='relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'>
                                {/* Image Container */}
                                <div className=' overflow-hidden'>
                                    <img 
                                        src={item.image[0]} 
                                        alt="" 
                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                    />
                                </div>
                                
            

                                {/* Badge */}
                                <div className='absolute top-3 right-3'>
                                    <span className='bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg'>
                                        #{index + 1}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className='text-center mt-12'>
                <Link 
                    to="/collections" 
                    className='inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                >
                    View All Collections
                    <svg className='ml-2 w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default LatestCollections