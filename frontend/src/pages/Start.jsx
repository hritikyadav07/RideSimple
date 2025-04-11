import React from 'react'
import { Link } from 'react-router-dom';
import image from '../assets/front.png'
import logo from '../assets/logoWhite.png' // Added missing logo import

const Start = () => {
  return (
    <div className="font-[Inter]">
      <div
        className="bg-cover bg-center h-screen flex justify-between flex-col w-full relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="pt-8 px-6 sm:pt-10 sm:px-8">
          {/* <img className="w-64 sm:w-80" src={logo} alt="RideSimple Logo"/> */}
        </div>
        
        <div className="pb-7 py-4 px-4 sm:px-6 md:px-8 inset-0 bottom-0 bg-gradient-to-b from-gray-900/70 to-transparent">
          <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
            <span className='text-yellow-400'>Ride</span> with ease arrive with style
          </div>
          <h4 className="text-white text-sm sm:text-base mb-6">
            Wherever life takes you—from quick commutes to grand adventures—ride
            with comfort, safety, and reliability. Your journey matters, and
            we're here to make every mile effortless.
          </h4>
          <Link
            to="/login"
            className="flex items-center justify-center w-full sm:w-[90%] bg-black text-white py-3 rounded-xl mt-5 sm:ml-4 hover:bg-gray-800 transition duration-300"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start