import React from "react";
import contactimg from "../assets/images/contact_img1.jpg";

const Contact = () => {
  return (
    <div className="mt-20 p-10 max-w-6xl mx-auto">
      <div>
       <div className='font-medium text-2xl text-center mb-10 ' ><h1 className='text-[#6B7280]'>CONTACT <span className='text-black'>US</span> </h1></div>
        <div className="grid gap-10 lg:grid-cols-2 items-center lg:m-10 border  border-gray-300 rounded-md">
          <img src={contactimg} alt="contact-img" className="rounded-md" />
          <div className="space-y-5 text-gray-500 px-4 py-5">
            <h1 className="font-bold text-xl text-black">Our Store</h1>
            <h3 className="font-medium text-md text-black">Stylique Office</h3>
            <p>OMR Road, Thoraipakkam,<br /> Chennai – 600097, Tamil Nadu, India</p>
            <div>
              <p> <span className="text-black">Tel: </span>(+91) 99444 12345</p>
              <p><span className="text-black">Email:</span> support@stylique.in</p>
            </div>
            <h1 className="font-bold text-xl text-black">Careers at Stylique</h1>
            <p>We’re building Stylique from the heart of South India with global aspirations. Join our team of designers, developers, marketers, and dreamers who are redefining online fashion..</p>
            <button className=" border px-5 py-3 hover:bg-black hover:text-white cursor-pointer">Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
