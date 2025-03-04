import React, {useRef, useState, useContext, useEffect} from 'react'
// import image from '../assets/image.png'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitForDriver from '../components/WaitForDriver';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import {UserDataContext} from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import logo from '../assets/logoWhite.png';
import { Link } from 'react-router-dom';

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
  const [fare, setFare] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [vehicleType, setVehicleType] = useState('')
  const { socket } = useContext(SocketContext);
  const { user, setRideData, rideData } = useContext(UserDataContext)  
  // const [ride, setRide] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    socket.emit('join', {userType:"user", userId:user._id});
  }, [user])

  // confirm ride event listener
  useEffect(() => {
    const rideConfirmedHandler = (ride) => {
      // console.log("RIdeDeatils:", ride);
      setRideData(ride);
      setWaitingForDriver(true);
      setVehicleFound(false);
    };
    socket.on('ride-confirmed', rideConfirmedHandler);
    
    // Cleanup listener on unmount
    return () => {
      socket.off('ride-confirmed', rideConfirmedHandler);
    };
  }, [socket]);

  // ride started event listener
  useEffect(() => {
    
    const rideStartedHandler = (ride) => {
      // console.log("Ride Started:", ride);
      setWaitingForDriver(false);
      setRideData(ride);
      navigate(`/riding`);
    }

    socket.on('ride-started', rideStartedHandler);
    
    // Cleanup listener on unmount
    return () => {
      socket.off('ride-started', rideStartedHandler);
    };
  }, [socket]);

  const submitHandler = (e) => { 
    e.preventDefault()
  }

  // Function to fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    try {
      if(query.length < 3) return; // Don't fetch suggestions if query is less than 3 characters
      // console.log('Fetching suggestions for:', query);
      const token = localStorage.getItem('token'); // Retrieve JWT token if available
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${query}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      // Assuming the API returns { suggestions: [...] }
      setSuggestions(response.data);
      // console.log('Suggestions:', response.data);
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  // Callback for when a suggestion is selected
  const handleSelectSuggestion = (suggestion) => {
    if(activeField === 'pickup') {
      setPickup(suggestion)
    } else if(activeField === 'destination') {
      setConfirmRidePanel(false)
      setDestination(suggestion)
      
    }
    setSuggestions([])
  }

  async function findTrip() {
    setVehiclePanelOpen(true)
    setPanelOpen(false)
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickup,
        destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
   
    // console.log(response.data);
    setFare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      fare,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    // console.log(response.data);

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
  }, [confirmRidePanel])

  useGSAP(function () {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)'
    })
  }, [vehicleFound])

  useGSAP(function () {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)'
    })
    // console.log(confirmRidePanel)
  }, [waitingForDriver])

  

  return (
    <div className='h-screen relative overflow-hidden bg-gray-900'>
      {/* Changed position and added z-index, and conditionally hide when panel is open */}
      {!panelOpen && (
        <div className='fixed p-2 top-0 flex items-center justify-between w-screen z-10'>
          <img className='w-72 pl-3 pt-6' src={logo} alt="" />
          <Link to='/logout' className='h-10 w-10  text-white flex items-center justify-center rounded-full'>
              <i className="text-2xl font-bold  ri-logout-box-r-line"></i>
          </Link>
        </div>
      )}
      
      {/* map here */}
      <div className='h-screen w-screen'>
        <LiveTracking/>
      </div>

      {/* location panel here */}
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-gray-800 text-white relative'>
          <h5 ref={panelCloseRef}  onClick={()=>{ setPanelOpen(false) }} className='absolute right-6 top-6 text-2xl text-gray-300'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          
          <h4 className='text-2xl font-semibold text-white'>Find a trip</h4>
          <form onSubmit={(e)=> submitHandler(e)}>
            <div className='line absolute h-20 w-1  top-[35%] left-10 bg-gray-400 rounded-full '></div>
            <input 
              onFocus={() => {
                setActiveField('pickup');
                setPanelOpen(true); // Open location search panel on focus
              }}
              onChange={(e)=>{
                setPickup(e.target.value)
                setActiveField('pickup')
                fetchSuggestions(e.target.value)
              }}
              value={pickup}
              className='bg-gray-700 text-white px-12 py-2 text-lg rounded-lg w-full mt-5 placeholder-gray-400' 
              placeholder='Add a pickup Location' 
              type="text" 
            />
            <input 
              onFocus={() => {
                setActiveField('destination');
                setPanelOpen(true); // Open location search panel on focus
              }}
              onChange={(e)=>{
                setDestination(e.target.value)
                setActiveField('destination')
                fetchSuggestions(e.target.value)
                }}
                value={destination}
                className='bg-gray-700 text-white px-12 py-2 text-lg rounded-lg w-full mt-5 placeholder-gray-400' 
                placeholder='Enter Your Destination' 
                type="text" />
              </form>
            <button onClick={findTrip} className='bg-blue-600 text-white px-4 py-2 rounded-lg mt-3 w-full hover:bg-blue-700 transition duration-300'>
              Find Trip
            </button>
        </div>
        <div ref={panelRef} className='bg-gray-800 h-0'>
          <LocationSearchPanel 
          setPanelOpen={setPanelOpen} 
          setVehiclePanelOpen={setVehiclePanelOpen}
          suggestionList={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
          />
        </div>
      </div>
            
            {/* vehicle panel  */}
      <VehiclePanel 
        fare={fare}
        vehiclePanelOpen = {vehiclePanelOpen}
        setVehicleType={setVehicleType}
        setConfirmRidePanel={setConfirmRidePanel} 
        vehiclePanelOpenRef={vehiclePanelOpenRef} 
        setVehiclePanelOpen={setVehiclePanelOpen} 
      />
      {/* confirmation component */}
      <ConfirmRide
        pickup={pickup} 
        destination={destination} 
        fare = {fare}
        vehicleType={vehicleType}
        createRide={createRide}
        setVehicleFound={setVehicleFound}  
        confirmRidePanelRef={confirmRidePanelRef} 
        confirmRidePanel={confirmRidePanel} 
        setConfirmRidePanel={setConfirmRidePanel}
      />
      <LookingForDriver 
        vehicleFound={vehicleFound}
        pickup={pickup} 
        destination={destination} 
        fare = {fare}
        vehicleType={vehicleType}
        vehicleFoundRef={vehicleFoundRef} 
        setVehicleFound={setVehicleFound}
      />
      <WaitForDriver
        ride={rideData}
        waitingForDriverRef={waitingForDriverRef}
        setWaitingForDriver={setWaitingForDriver} 
      />
    </div>
  )
}

export default Home