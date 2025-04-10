import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/newLogo.png'  // Updated logo import

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="RideSimple Logo" className="h-8" />
        </Link>
        <div className="flex space-x-4">
          <Link to="/home" className="text-white">Home</Link>
          <Link to="/login" className="text-white">Login</Link>
          <Link to="/signup" className="text-white">Signup</Link>
          <Link to="/captain-login" className="text-white">Captain Login</Link>
          <Link to="/captain-signup" className="text-white">Captain Signup</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar