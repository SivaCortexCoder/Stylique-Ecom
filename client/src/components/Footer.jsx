import React from 'react'
import logo from '../assets/images/logo.png'

const Footer = () => {
  return (
      <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300 bg-[#000000]">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                <div className="md:max-w-96">
                    <img className="w-36 h-auto" src={logo} alt="logo" />
                    <p className="mt-6 text-sm">
                        Fashion has evolved through generations, and so have we — delivering timeless style, effortless comfort, and a shopping experience designed to inspire confidence in every customer, everywhere, every single day.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>(+91) 99444 12345</p>
                            <p>support@stylique.in</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © Stylique. All Right Reserved.
            </p>
        </footer>
  )
}

export default Footer