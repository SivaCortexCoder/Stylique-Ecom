import React from 'react'
import exchange from '../assets/images/exchange.png'
import returnImg from '../assets/images/return.png'
import supportImg from '../assets/images/support.png'

const FeaturesSection = () => {
  return (
<div className="max-w-6xl mx-auto  p-10">
  <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between lg:items-start my-10">
    
    {/* Exchange */}
    <div className="flex flex-col items-center text-center">
      <img className="w-14 mb-3" src={exchange} alt="exchange" />
      <h1 className="font-semibold text-lg">Easy Exchange Policy</h1>
      <p className="text-gray-500">We offer hassle-free exchange policy</p>
    </div>

    {/* Return */}
    <div className="flex flex-col items-center text-center">
      <img className="w-14 mb-3" src={returnImg} alt="return" />
      <h1 className="font-semibold text-lg">7 Days Return Policy</h1>
      <p className="text-gray-500">We provide 7 days free return policy</p>
    </div>

    {/* Support */}
    <div className="flex flex-col items-center text-center">
      <img className="w-14 mb-3" src={supportImg} alt="support" />
      <h1 className="font-semibold text-lg">Best Customer Support</h1>
      <p className="text-gray-500">We provide 24/7 customer support</p>
    </div>

  </div>
</div>

  )
}

export default FeaturesSection