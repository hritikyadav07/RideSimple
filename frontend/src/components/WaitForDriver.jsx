import React from 'react'

const WaitForDriver = (props) => {
  if (!props.ride) {
    return (
      <div ref={props.waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-gray-800 text-white px-3 py-5 rounded-t-xl'>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Waiting for driver information...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={props.waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-gray-800 text-white px-3 py-5 rounded-t-xl'>
      <h5 
        className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' 
        onClick={() => {
          props.setWaitingForDriver(false)
        }}
      >
        <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-between pt-4'>
        <img 
          className='h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover' 
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
          alt="Driver" 
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize text-white'>
            {props.ride?.captain?.fullname?.firstname}
          </h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1 text-blue-400'>
            {props.ride?.captain?.vehicle?.plate}
          </h4>
          <p className='text-sm text-gray-400'>Maruti Suzuki Alto</p>
          <div className='flex items-center justify-end space-x-1'>
            <h2 className='text-lg font-medium text-white'>OTP: </h2>
            <p className='text-lg font-bold text-blue-400'>{props.ride?.otp}</p>
          </div>
        </div>
      </div>

      <div className='mt-6 bg-gray-700 rounded-xl p-3'>
        <div className='flex items-center gap-5 p-3 border-b border-gray-600'>
          <i className="ri-map-pin-user-fill text-2xl text-blue-400"></i>
          <div className='flex-grow'>
            <h3 className='text-lg font-medium'>From:</h3>
            <p className='text-sm -mt-1 text-gray-400 break-words'>
              {props.ride?.pickup}
            </p>
          </div>
        </div>
        
        <div className='flex items-center gap-5 p-3 border-b border-gray-600'>
          <i className="text-2xl ri-map-pin-2-fill text-blue-400"></i>
          <div className='flex-grow'>
            <h3 className='text-lg font-medium'>To:</h3>
            <p className='text-sm -mt-1 text-gray-400 break-words'>
              {props.ride?.destination}
            </p>
          </div>
        </div>
        
        <div className='flex items-center gap-5 p-3'>
          <i className="text-2xl ri-currency-line text-green-400"></i>
          <div>
            <h3 className='text-lg font-medium'>
              ₹{props.ride?.fare} 
            </h3>
            <p className='text-sm -mt-1 text-gray-400'>Cash</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="animate-pulse flex space-x-2 items-center">
          <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
          <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
          <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
          <span className="ml-2 text-blue-400">Captain is on the way</span>
        </div>
      </div>
    </div>
  )
}

export default WaitForDriver