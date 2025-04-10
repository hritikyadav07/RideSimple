import React, {useRef, useState, useContext, useEffect} from 'react'
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
import logo from '../assets/newLogo.png';  // Updated logo import
import { Link } from 'react-router-dom';

function Home() {
  // State variables
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [fare, setFare] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [vehicleType, setVehicleType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Refs
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelOpenRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  // Contexts and navigation
  const { socket } = useContext(SocketContext);
  const { user, setRideData, rideData } = useContext(UserDataContext)  
  const navigate = useNavigate();

  // Connect to socket when component mounts
  useEffect(() => {
    if (user && user._id) {
      socket.emit('join', {userType:"user", userId:user._id});
    }
  }, [user, socket])

  // Confirm ride event listener
  useEffect(() => {
    const rideConfirmedHandler = (ride) => {
      setRideData(ride);
      setWaitingForDriver(true);
      setVehicleFound(false);
    };
    
    socket.on('ride-confirmed', rideConfirmedHandler);
    
    // Cleanup listener on unmount
    return () => {
      socket.off('ride-confirmed', rideConfirmedHandler);
    };
  }, [socket, setRideData]);

  // Ride started event listener
  useEffect(() => {
    const rideStartedHandler = (ride) => {
      setWaitingForDriver(false);
      setRideData(ride);
      navigate(`/riding`);
    }

    socket.on('ride-started', rideStartedHandler);
    
    // Cleanup listener on unmount
    return () => {
      socket.off('ride-started', rideStartedHandler);
    };
  }, [socket, navigate, setRideData]);

  const submitHandler = (e) => { 
    e.preventDefault()
  }

  // Function to fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    try {
      if(query.length < 3) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${query}`, 
        {
          headers: { Authorization: token ? `Bearer ${token}` : '' }
        }
      );
      
      setSuggestions(response.data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      setError('Unable to load location suggestions');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
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
    setPanelOpen(false)
  }

  // Find trip with fare calculation
  async function findTrip() {
    if (!pickup || !destination) {
      setError('Please enter pickup and destination locations');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`, 
        {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      
      setFare(response.data);
      setVehiclePanelOpen(true);
      setPanelOpen(false);
    } catch (err) {
      console.error('Failed to calculate fare:', err);
      setError('Unable to calculate fare. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Create a new ride
  async function createRide() {
    try {
      setIsLoading(true);
      setError('');
      
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`, 
        { pickup, destination, fare, vehicleType },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      setVehicleFound(true);
      setConfirmRidePanel(false);
    } catch (err) {
      console.error('Failed to create ride:', err);
      setError('Unable to create ride. Please try again.');
      setConfirmRidePanel(false);
    } finally {
      setIsLoading(false);
    }
  }

  // GSAP animations for panels
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        ease: 'power2.out',
        duration: 0.3
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.2,
        delay: 0.1
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        ease: 'power2.in',
        duration: 0.3
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.2
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelOpenRef.current, {
      transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)',
      ease: 'power2.inOut',
      duration: 0.4
    });
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
      ease: 'power2.inOut',
      duration: 0.4
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
      ease: 'power2.inOut',
      duration: 0.4
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
      ease: 'power2.inOut',
      duration: 0.4
    });
  }, [waitingForDriver]);

  return (
    <div className='h-screen relative overflow-hidden bg-gray-900'>
      {/* Header - conditionally hide when panel is open */}
      {!panelOpen && (
        <div className='fixed p-2 top-0 flex items-center justify-between w-full z-10'>
          <img className='w-48 sm:w-72 p-3 pt-6' src={logo} alt="RideSimple Logo" />
          <Link to='/user/logout' className='h-10 w-10 text-white flex items-center justify-center rounded-full'>
            <i className="text-2xl font-bold ri-logout-box-r-line"></i>
          </Link>
        </div>
      )}
      
      {/* Map container */}
      <div className='h-screen w-screen'>
        <LiveTracking/>
      </div>

      {/* Error notification */}
      {error && (
        <div className="fixed top-16 left-0 right-0 mx-auto w-5/6 z-50 bg-red-500 text-white p-3 rounded-md text-center">
          {error}
          <button 
            onClick={() => setError('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
          >
            &times;
          </button>
        </div>
      )}

      {/* Location search panels */}
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-4 sm:p-5 bg-gray-800 text-white relative rounded-t-xl'>
          <h5 
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)} 
            className='absolute right-6 top-6 text-2xl text-gray-300 cursor-pointer'
          >
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          
          <h4 className='text-xl sm:text-2xl font-semibold text-white mb-4'>Find a trip</h4>
          
          <form onSubmit={submitHandler}>
            <div className='line absolute h-20 w-1 top-[35%] left-10 bg-gray-400 rounded-full hidden sm:block'></div>
            
            <input 
              onFocus={() => {
                setActiveField('pickup');
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveField('pickup');
                fetchSuggestions(e.target.value);
              }}
              value={pickup}
              className='bg-gray-700 text-white px-6 sm:px-12 py-3 text-lg rounded-lg w-full mb-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Add a pickup Location' 
              type="text" 
              disabled={isLoading}
            />
            
            <input 
              onFocus={() => {
                setActiveField('destination');
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField('destination');
                fetchSuggestions(e.target.value);
              }}
              value={destination}
              className='bg-gray-700 text-white px-6 sm:px-12 py-3 text-lg rounded-lg w-full mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Enter Your Destination' 
              type="text"
              disabled={isLoading}
            />
          </form>
          
          <button 
            onClick={findTrip} 
            disabled={isLoading || !pickup || !destination}
            className='bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700 transition duration-300 disabled:opacity-70 disabled:bg-blue-800'
          >
            {isLoading ? 'Calculating...' : 'Find Trip'}
          </button>
        </div>
        
        {/* Location search results panel */}
        <div ref={panelRef} className='bg-gray-800 h-0 rounded-t-xl'>
          <LocationSearchPanel 
            setPanelOpen={setPanelOpen} 
            setVehiclePanelOpen={setVehiclePanelOpen}
            suggestionList={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            isLoading={isLoading}
          />
        </div>
      </div>
            
      {/* Panels for ride flow */}
      <VehiclePanel 
        fare={fare}
        vehiclePanelOpen={vehiclePanelOpen}
        setVehicleType={setVehicleType}
        setConfirmRidePanel={setConfirmRidePanel} 
        vehiclePanelOpenRef={vehiclePanelOpenRef} 
        setVehiclePanelOpen={setVehiclePanelOpen} 
      />
      
      <ConfirmRide
        pickup={pickup} 
        destination={destination} 
        fare={fare}
        vehicleType={vehicleType}
        createRide={createRide}
        setVehicleFound={setVehicleFound}  
        confirmRidePanelRef={confirmRidePanelRef} 
        confirmRidePanel={confirmRidePanel} 
        setConfirmRidePanel={setConfirmRidePanel}
        isLoading={isLoading}
      />
      
      <LookingForDriver 
        vehicleFound={vehicleFound}
        pickup={pickup} 
        destination={destination} 
        fare={fare}
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