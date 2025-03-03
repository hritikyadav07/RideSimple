import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'
import logo from '../assets/caplogo.png'

const toRad = (value) => (value * Math.PI) / 180

const haversineDistance = (coords1, coords2) => {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(coords2.lat - coords1.lat)
  const dLon = toRad(coords2.lng - coords1.lng)
  const lat1 = toRad(coords1.lat)
  const lat2 = toRad(coords2.lat)
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const ride = location.state?.ride

    // NEW: state for current distance and user position
    const [currentDistance, setCurrentDistance] = useState(ride?.distance || 0)
    const [currentPosition, setCurrentPosition] = useState(null)

    // NEW: update current position using geolocation and recalc distance if destination coords exist.
    useEffect(() => {
        let watchId
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(position => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                setCurrentPosition(pos)
                // Assume ride.destinationCoords exists: { lat, lng }
                if (ride?.destinationCoords) {
                    const newDistance = haversineDistance(pos, ride.destinationCoords)
                    setCurrentDistance(newDistance)
                }
            }, error => {
                console.error("Error getting current position:", error)
            }, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 })
        } else {
            console.error("Geolocation not supported")
        }
        return () => navigator.geolocation.clearWatch(watchId)
    }, [ride?.destinationCoords])

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen relative flex flex-col justify-end text-white'>

            {/* top bar */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-72 -ml-20 -mt-6' src={logo} alt="" />
                <Link to='/captain-home' className='h-10 w-10  text-white flex items-center justify-center rounded-full'>
                    <i className="text-2xl font-bold  ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* yellow bar with updated distance */}
            <div className='h-1/5 p-6 flex items-center justify-between relative bg-gray-800 pt-10'
                onClick={() => {
                    setFinishRidePanel(true)
                }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0'>
                    <i className="text-3xl text-gray-500 ri-arrow-up-wide-line"></i>
                </h5>
                <h4 className='text-xl font-semibold text-blue-400'>{currentDistance.toFixed(1)}km away</h4>
                <button className='bg-yellow-600 text-white font-semibold p-3 px-10 rounded-lg hover:bg-yellow-700'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-gray-800 px-3 py-10 pt-12'>
                <FinishRide
                    ride={ride}
                    setFinishRidePanel={setFinishRidePanel}
                    finishRidePanel={finishRidePanel}
                />
            </div>

            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking />
            </div>

        </div>
    )
}

export default CaptainRiding