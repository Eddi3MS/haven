import React from 'react'
import { Navbar } from './navbar'

export const Header = () => {
  return (
    <div className="flex justify-between">
      <p>Logo</p>
      <Navbar />
    </div>
  )
}
