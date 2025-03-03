import React from 'react'
import driverImage from '../assets/driver.png'

function LookingForDriver(props) {
  if (!props.vehicleFound) return null;

  return (
    <div>
      <div ref={props.vehicleFoundRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-gray-800 text-white px-3 py-5'>
        {/* closing button */}
        <h5 ref={props.vehicleFoundRef} onClick={()=>{
            props.setVehicleFound(false)
         }} className='p-1 text-gray-500 text-center w-[93%] absolute top-0 text-3xl font-semibold'>
            <i className='ri-arrow-down-wide-line'></i>
        </h5>
        <h3 className='mt-5 text-xl text-center font-semibold mb-5'>Looking For Driver</h3>
        <div className='flex gap-2 justify-between flex-col items-center'>
          <img className='h-20' src={driverImage} alt="" />
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-700'>
              <i className="ri-map-pin-user-fill text-blue-400"></i>
                <div>
                  <h3 className='text-lg font-medium'>From:</h3>
                    <p className='text-sm -mt-1 text-gray-400'>{props.pickup}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-700'>
              <i className="text-lg ri-map-pin-2-fill text-blue-400"></i>
                <div>
                  <h3 className='text-lg font-medium'>To:</h3>
                  <p className='text-sm -mt-1 text-gray-400'>{props.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line text-green-400"></i>
                <div>
                  <h3 className='text-lg font-medium'>
                    ₹{props.fare[props.vehicleType]}
                    </h3>
                  <p className='text-sm -mt-1 text-gray-400'>Cash</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver