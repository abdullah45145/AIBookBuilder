import React from 'react'
import Navbar from '../component/layout/Navbar'
import HeroSection from '../component/landing/Hero'
import Feautures from '../component/landing/Feautures'
import Testimonials from '../component/landing/Testimonials'
import Footer from '../component/landing/Footer'

const Landingpage = () => {
  return (
    <>
    <Navbar />
    <HeroSection/>
    <Feautures/>
    <Testimonials/>
    <Footer/>
    </>

  )
}

export default Landingpage

