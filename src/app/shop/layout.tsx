import Navbar from '@/components/Landing-Page/Navbar';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
    <Navbar />
    {children}
    </>
  )
}

export default layout