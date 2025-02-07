import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* put link to the homepage image url down && change image of the logo */}
        <div className=' bg-cover bg-bottom bg-[url(https://cdn.openai.com/labs/images/A%203D%20render%20of%20an%20astronaut%20walking%20in%20a%20green%20desert.webp?v=1)] h-screen pt-8  flex justify-between flex-col w-full bg-red-400'>
        <img className='w-14 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with RideSimple</h2>
                <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home