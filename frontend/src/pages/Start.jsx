import React from 'react'
import { Link } from 'react-router-dom';
import image from '../assets/front.png'

const Start = () => {
  return (
    <div style={{ fontFamily: "'Times New Roman', serif" }}>
      <div
        className="bg-cover bg-bottom h-screen pt-10  flex justify-between flex-col w-full"
        style={{ backgroundImage: `url(${image})` }}
      >
        <img className="w-80 -ml-20 -mt-6"  alt="Logo"/>
        <div className="pb-7 py-4 px-4 inset-0 bottom-0 bg-gradient-to-b from-gray-400/50 to-transparent ">
          <div className="text-3xl font-bold text-white">
           <span className='text-black'>Ride</span>  with ease arrive with style
          </div>
          <h4 className="text-white">
            Wherever life takes you—from quick commutes to grand adventures—ride
            with comfort, safety, and reliability. Your journey matters, and
            we’re here to make every mile effortless.
          </h4>
          <Link
            to="/login"
            className="flex items-center justify-center w-[90%] bg-black text-white py-3 rounded-xl mt-5 ml-4"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start