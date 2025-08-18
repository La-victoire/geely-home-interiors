"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

const BackButton = () => {
  return (
    <Button variant="outline" onClick={() => history.back()}>
      <ArrowLeft />
      Go Back 
    </Button>
  )
}

export default BackButton