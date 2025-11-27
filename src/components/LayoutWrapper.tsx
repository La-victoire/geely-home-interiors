"use client"

import React, { useEffect, useState } from 'react'
import Navbar from './Landing-Page/Navbar';
import Footer from './Landing-Page/Footer';

const LayoutWrapper = (
  {
  children, session
}:{
  children: React.ReactNode, session:any
}, 
) => {
  const [isSpecialPage, setIsSpecialPage] = useState(false);

  useEffect(() => {
    const hasMarkers = document.querySelector('[data-not-found]') || document.querySelector('[data-loading]') || document.querySelector('[data-error]') || document.querySelector('[data-authentication]');

    setIsSpecialPage(!!hasMarkers)
  }, [children])

  
  if (isSpecialPage) {
    return <>
    {children}
    </>
  } else {
  return (
    <>
    <Navbar session={session}/>
    {children}
    <Footer session={session}/>
    </>
  )
}
}


export default LayoutWrapper
