import React, {useRef, useState} from 'react'
import image from '../assets/image.png'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

function Home() {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)


  const submitHandler = (e) => { 
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
        gsap.to(panelRef.current, {
            height: '70%',
            padding: 24
            // opacity:1
        })
        gsap.to(panelCloseRef.current, {
            opacity: 1
        })
    } else {
        gsap.to(panelRef.current, {
            height: '0%',
            padding: 0
            // opacity:0
        })
        gsap.to(panelCloseRef.current, {
            opacity: 0
        })
    }
}, [ panelOpen ])

  return (
    <div className='h-screen relative '>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src={image} alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>

        <div className='h-[30%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef}  onClick={()=>{
            setPanelOpen(false)
          }} className='absolute right-6 top-6 text-2xl'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e)=> submitHandler(e)}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full'></div>
            <input 
              onClick={()=>{
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e)=>{
                setPickup(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 ' 
              placeholder='Add a pickup Location' 
              type="text" 
            />
            <input 
              onClick={()=>{
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e)=>{
                setDestination(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 ' 
              placeholder='Enter Your Destination' 
              type="text" />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
              <LocationSearchPanel/>
        </div>

      </div>
      <div></div>
    </div>
  )
}

export default Home