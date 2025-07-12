import React from 'react'
import aboutimg from '../assets/images/about_img1.jpg'

const About = () => {
  const features = [
    {
      title: "Quality Assurance",
      description: "We meticulously select and vet each product to ensure it meets our stringent quality standards."
    },
    {
      title: "Convenience",
      description: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier."
    },
    {
      title: "Exceptional Customer Service",
      description: "Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority."
    }
  ]

  return (
    <div className="mt-20 p-10 max-w-6xl mx-auto">
      <section>
        
        <h1 className="font-medium text-2xl text-center mb-10">
          <span className="text-gray-500">ABOUT </span>
          <span className="text-black">US</span>
        </h1>

      
        <div className="grid gap-20 lg:grid-cols-2 items-center">
          <img 
            src={aboutimg} 
            alt="About Stylique - our story and mission" 
            className="w-full h-auto"
          />
          
          <div className="space-y-8 text-gray-600">
            <p>
              Stylique was born out of a passion for innovation and a desire to revolutionize 
              the way people shop online. Our journey began with a simple idea: to provide a 
              platform where customers can easily discover, explore, and purchase a wide range 
              of products from the comfort of their homes.
            </p>
            
            <p>
              Since our inception, we've worked tirelessly to curate a diverse selection of 
              high-quality products that cater to every taste and preference. From fashion and 
              beauty to electronics and home essentials, we offer an extensive collection 
              sourced from trusted brands and suppliers.
            </p>
            
            <div>
              <h2 className="font-semibold text-black mb-2 text-lg">Our Mission</h2>
              <p>
                Our mission at Stylique is to empower customers with choice, convenience, and 
                confidence. We're dedicated to providing a seamless shopping experience that 
                exceeds expectations, from browsing and ordering to delivery and beyond.
              </p>
            </div>
          </div>
        </div>

        
        <section className="mt-20">
          <h2 className="font-semibold text-xl text-center mb-8">
            <span className="font-medium text-gray-600">WHY </span>
            <span className="text-black">CHOOSE US</span>
          </h2>
          
          <div className="grid lg:grid-cols-3 ">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="border border-gray-300 p-16"
              >
                <h3 className="font-bold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-sm ">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}

export default About