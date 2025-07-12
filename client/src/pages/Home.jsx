import React from 'react'
import HeroSection from '../components/HeroSection'
import Testimonials from '../components/Testimonials'
import CardShower from '../components/CardShower'
import FeaturesSection from '../components/FeaturesSection'
import LatestCollections from '../components/LatestCollections'

const Home = () => {
  return (
    <div>
        <HeroSection/>
        <LatestCollections/>
        <CardShower/>
        <Testimonials/>
        <FeaturesSection/>
        
    </div>
  )
}

export default Home