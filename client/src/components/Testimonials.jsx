import React from 'react'
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  return (
   <div className="text-center bg-[#F5F7FF] py-10">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Shoppers Say</h1>
    <p className="text-sm md:text-base text-gray-500 mt-4">Join thousands of style-savvy customers who love shopping with us.</p>
    <div className="flex flex-wrap justify-center gap-5 mb-20 mt-10 text-left">
        <div className="w-80 flex flex-col items-start border border-gray-500/30 p-5 rounded-lg bg-white">
            <Quote size={44} stroke="#2563EB" strokeWidth={2} /> 
            <div className="flex items-center justify-center mt-3 gap-1">
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
            </div>
            <p className="text-sm mt-3 text-gray-500">I’ve been shopping here for months, and the experience is always seamless. The site loads fast, checkout is smooth, and the collection is seriously on-trend. Highly recommend for fashion lovers!</p>
            <div className="flex items-center gap-3 mt-4">
                <img className="h-12 w12 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100" alt="userImage1"/>
                <div>
                    <h2 className="text-lg text-gray-900 font-medium">Donald Jackman</h2>
                    <p className="text-sm text-gray-500">Fashion Blogger @ StyleDaily</p>
                </div>
            </div>
        </div>

        <div className="w-80 flex flex-col items-start border border-gray-500/30 p-5 rounded-lg bg-white">
           <Quote size={44} stroke="#2563EB" strokeWidth={2} /> 
            <div className="flex items-center justify-center mt-3 gap-1">
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
            </div>
            <p className="text-sm mt-3 text-gray-500">The UI is super clean, and it feels like a premium experience. Love how fast the product pages load. As a developer and a shopper, I’m really impressed with the tech behind it.</p>
            <div className="flex items-center gap-3 mt-4">
                <img className="h-12 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="userImage2"/>
                <div>
                    <h2 className="text-lg text-gray-900 font-medium">Daniel Clarke</h2>
                    <p className="text-sm text-gray-500">Fashion Blogger @ StyleDaily</p>
                </div>
            </div>
        </div>

        <div className="w-80 flex flex-col items-start border border-gray-500/30 p-5 rounded-lg bg-white">
            <Quote size={44} stroke="#2563EB" strokeWidth={2} /> 
            <div className="flex items-center justify-center mt-3 gap-1">
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
                <Star size={16} style={{ fill: "#FF532E", stroke: "#FF532E" }} />
            </div>
            <p className="text-sm mt-3 text-gray-500">It’s refreshing to see a fashion site that nails both style and performance. The minimal design, intuitive filters, and smooth checkout process make shopping a joy.</p>
            <div className="flex items-center gap-3 mt-4">
                <img className="h-12 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop" alt="userImage3"/>
                <div>
                    <h2 className="text-lg text-gray-900 font-medium">Sophia Turner</h2>
                    <p className="text-sm text-gray-500">Fashion Blogger @ StyleDaily</p>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Testimonials