import React from 'react'

function LookingForDriver(props) {
  return (
    <div>
      <div ref={props.vehicleFoundRef}  className='fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-5'>
        {/* closing button */}
        < h5 ref={props.vehicleFoundRef}  onClick={()=>{
            props.setVehicleFound(false)
         }} className='p-1 text-gray-300 text-center w-[93%] absolute top-0 text-3xl font-semibold'>
            <i className=' ri-arrow-down-wide-line'></i>
        </h5>
        <h3 className=' mt-5 text-xl text-center font-semibold mb-5'>Looking For Driver</h3>
        <div className='flex gap-2 justify-between flex-col items-center'>
          <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="ri-map-pin-user-fill"></i>
                <div>
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                  <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line"></i>
                <div>
                  <h3 className='text-lg font-medium'>
                    {/* ₹{props.fare[ props.vehicleType ]} */}
                    ₹193.20
                    </h3>
                  <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default LookingForDriver