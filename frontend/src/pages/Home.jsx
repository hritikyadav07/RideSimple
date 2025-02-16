import React, {useRef, useState} from 'react'
import image from '../assets/image.png'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
// import WaitForDriver from '../components/WaitForDriver';
import LookingForDriver from '../components/LookingForDriver';
import WaitForDriver from '../components/WaitForDriver';

function Home() {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const vehiclePanelOpenRef = useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const confirmRidePanelRef = useRef(null)
  const [vehicleFound, setVehicleFound] = useState(false)
  const vehicleFoundRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const waitingForDriverRef = useRef(null)


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

  useGSAP(function () {
    gsap.to(vehiclePanelOpenRef.current, {
      transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)'
    })
  }, [vehiclePanelOpen])

  useGSAP(function () {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)'
    })
    // console.log(confirmRidePanel)
  }, [confirmRidePanel])

  useGSAP(function () {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)'
    })
    // console.log(confirmRidePanel)
  }, [vehicleFound])

  useGSAP(function () {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)'
    })
    // console.log(confirmRidePanel)
  }, [waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden '>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      {/* map here */}
      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src={image} alt="" />
      </div>

      {/* location panel here */}
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
              <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>
      
      {/* vehicle panel  */}
      <VehiclePanel 
        setConfirmRidePanel={setConfirmRidePanel} 
        vehiclePanelOpenRef={vehiclePanelOpenRef} 
        setVehiclePanelOpen={setVehiclePanelOpen} 
      />
      {/* confirmation component */}
      <ConfirmRide
        pickup={pickup} 
        destination={destination} 
        setVehicleFound={setVehicleFound}  
        confirmRidePanelRef={confirmRidePanelRef} 
        confirmRidePanel={confirmRidePanel} 
        setConfirmRidePanel={setConfirmRidePanel}
      />
      <LookingForDriver 
        pickup={pickup} 
        destination={destination} 
        vehicleFoundRef={vehicleFoundRef} 
        setVehicleFound={setVehicleFound}
      />
      <WaitForDriver
        waitingForDriverRef={waitingForDriverRef}
        setWaitingForDriver={setWaitingForDriver} 
      />
    </div>
  )
}

export default Home