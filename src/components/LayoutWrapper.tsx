"use client"

import React, { useEffect, useState } from 'react'
import Navbar from './Landing-Page/Navbar';
import Footer from './Landing-Page/Footer';

const LayoutWrapper = (
  {
  children,
}: Readonly<{
  children: React.ReactNode;
}>
) => {
  const [isSpecialPage, setIsSpecialPage] = useState(false)

  useEffect(() => {
    const hasMarkers = document.querySelector('[data-not-found]') || document.querySelector('[data-loading]') || document.querySelector('[data-error]') || document.querySelector('[data-authentication]');

    setIsSpecialPage(!!hasMarkers)
  }, [children])

  
  if (isSpecialPage) {
    return <>
    {children}
    </>
  }

  return (
    <>
    <Navbar />
    {children}
    <Footer />
    </>
  )
}

export default LayoutWrapper