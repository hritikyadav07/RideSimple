import React from 'react'

const WaitForDriver = (props) => {
  return (
    <div ref={props.waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-gray-800 text-white px-3 py-5'>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setWaitingForDriver(false)
      }}><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize text-white'>
            { props.ride?.captain.fullname.firstname }
            </h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1 text-blue-400'>
            {props.ride?.captain.vehicle.plate}
            </h4>
          <p className='text-sm text-gray-400'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold text-white'> 
             OTP:  
             </h1>
          <p className='text-sm text-blue-400'>
            {props.ride?.otp}
            </p>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-700'>
            <i className="ri-map-pin-user-fill text-blue-400"></i>
            <div>
              <h3 className='text-lg font-medium'>From:</h3>
              <p className='text-sm -mt-1 text-gray-400'>
                {props.ride?.pickup}
                </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-700'>
            <i className="text-lg ri-map-pin-2-fill text-blue-400"></i>
            <div>
              <h3 className='text-lg font-medium'>To:</h3>
              <p className='text-sm -mt-1 text-gray-400'>
                {props.ride?.destination}
                </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line text-green-400"></i>
            <div>
              <h3 className='text-lg font-medium'>
                ₹{props.ride?.fare} 
                </h3>
              <p className='text-sm -mt-1 text-gray-400'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitForDriver