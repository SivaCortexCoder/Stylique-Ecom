import React from "react";
import men from "../assets/images/men.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate = useNavigate()

  return (
    <div className="w-full">
      <div className="mt-20 px-5 relative">
        <img
          className="rounded-2xl w-full h-auto object-cover"
          src={men}
          alt="Men's Fashion"
        />

        <div
          className="absolute text-center 
                    top-10 left-1/2 transform -translate-x-1/2 
                    sm:top-16 md:top-20 lg:top-28 
                    px-2 sm:px-4 md:px-0 w-full max-w-[90%]"
        >
          <h1
            className="text-white font-bold 
                     text-lg sm:text-2xl md:text-2xl lg:text-5xl 
                      mb-2"
          >
            Unleash Your Style
          </h1>

          <button
          onClick={()=>{navigate('/collections')}}
            className="bg-white text-black px-4 py-2 rounded-lg 
                         text-sm sm:text-base cursor-pointer mx-auto"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;