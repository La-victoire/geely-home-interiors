"use client"

import React, { useEffect, useState } from 'react'
import Navbar from './Landing-Page/Navbar';
import Footer from './Landing-Page/Footer';

const LayoutWrapper = (
  {
  children
}:{
  children: React.ReactNode
}, 
) => {
  
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>
  )
}



export default LayoutWrapper
