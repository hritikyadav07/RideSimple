import React from 'react'
import carImage from '../assets/car.png'
import autoImage from '../assets/auto.png'
import bikeImage from '../assets/bike.png'

function VehiclePanel(props) {
  if (!props.vehiclePanelOpen) return null;

  return (
    <div>
      <div ref={props.vehiclePanelOpenRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-gray-900 px-4 py-10 text-white'>
        <h5 ref={props.vehiclePanelOpenRef} onClick={()=>{
            props.setVehiclePanelOpen(false)
          }} className='p-1 text-gray-400 text-center w-[93%] absolute top-0 text-3xl font-semibold'>
            <i className='ri-arrow-down-wide-line'></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5 text-white'>Choose A Vehicle</h3>
        {/* Car */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setVehiclePanelOpen(false)
          props.setVehicleType('car')
        }} className='flex mb-2 border-2 border-gray-700 bg-gray-800 hover:bg-gray-700 active:border-gray-400 rounded-xl w-full justify-between items-center p-3'>
          <img className='h-12' src={carImage} alt="Car" />
          <div className='w-1/2'>
              <h4 className='font-medium text-base text-white'>Car <span><i className='ri-user-3-fill'></i>4</span></h4>
              <h5 className='font-medium text-sm text-gray-300'>2 mins away</h5>
              <p className='font-medium text-xs text-gray-400'>Affordable rides</p>
          </div>
          <h2 className='text-xl font-semibold text-yellow-500'>₹{props.fare.car}</h2>
        </div>
        {/* Auto */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setVehiclePanelOpen(false)
          props.setVehicleType('auto')
        }} className='flex mb-2 border-2 border-gray-700 bg-gray-800 hover:bg-gray-700 active:border-gray-400 rounded-xl w-full justify-between items-center p-3'>
          <img className='h-12' src={autoImage} alt="Auto" />
          <div className='w-1/2'>
              <h4 className='font-medium text-base text-white'>Auto <span><i className='ri-user-3-fill'></i>3</span></h4>
              <h5 className='font-medium text-sm text-gray-300'>3 mins away</h5>
              <p className='font-medium text-xs text-gray-400'>Quick and nimble rides</p>
          </div>
          <h2 className='text-xl font-semibold text-yellow-500'>₹{props.fare.auto}</h2>
        </div>
        {/* Bike */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setVehiclePanelOpen(false)
          props.setVehicleType('moto')
        }} className='flex mb-2 border-2 border-gray-700 bg-gray-800 hover:bg-gray-700 active:border-gray-400 rounded-xl w-full justify-between items-center p-3'>
          <img className='h-12' src={bikeImage} alt="Bike" />
          <div className='w-1/2'>
              <h4 className='font-medium text-base text-white'>Bike <span><i className='ri-user-3-fill'></i>1</span></h4>
              <h5 className='font-medium text-sm text-gray-300'>1 min away</h5>
              <p className='font-medium text-xs text-gray-400'>Fast, economical rides</p>
          </div>
          <h2 className='text-xl font-semibold text-yellow-500'>₹{props.fare.moto}</h2>
        </div>
      </div>
    </div>
  )
}

export default VehiclePanel