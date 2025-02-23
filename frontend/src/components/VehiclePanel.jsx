import React from 'react'
import image from '../assets/image.png'

function VehiclePanel(props) {
  return (
    <div>
      <div ref={props.vehiclePanelOpenRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-10'>
        < h5 ref={props.vehiclePanelOpenRef}  onClick={()=>{
            props.setVehiclePanelOpen(false)
          }} className='p-1 text-gray-300 text-center w-[93%] absolute top-0 text-3xl font-semibold'>
            <i className=' ri-arrow-down-wide-line'></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose A Vehicle</h3>
        {/* vehicle 1 */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setVehiclePanelOpen(false)
        }} className='flex mb-2 border-2 bg-gray-200 active:border-black rounded-xl w-full justify-between items-center p-3'>
          <img className='h-12' src={image} alt="" />
          {/* car image */}
          <div className='w-1/2'>
              <h4 className='font-medium text-base'>UberGo<span><i className='ri-user-3-fill'></i>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-medium text-xs'>Affordable, compact rides</p>
          </div>{/* car details */}
          <h2 className='text-xl font-semibold'>₹193.20</h2>{/* price */}
        </div>
        {/* vehicle 2 */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setVehiclePanelOpen(false)
        }} className='flex mb-2 border-2 bg-gray-200 active:border-black rounded-xl w-full justify-between items-center p-3'>
          <img className='h-12' src={image} alt="" />
          {/* car image */}
          <div className='w-1/2'>
              <h4 className='font-medium text-base'>UberGo<span><i className='ri-user-3-fill'></i>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-medium text-xs'>Affordable, compact rides</p>
          </div>{/* car details */}
          <h2 className='text-xl font-semibold'>₹193.20</h2>{/* price */}
        </div>
        {/* vehicle 3 */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
          props.setVehiclePanelOpen(false)
        }} className='flex mb-2 border-2 bg-gray-200 active:border-black rounded-xl w-full justify-between items-center p-3'>
          <img className='h-12' src={image} alt="" />
          {/* car image */}
          <div className='w-1/2'>
              <h4 className='font-medium text-base'>UberGo<span><i className='ri-user-3-fill'></i>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-medium text-xs'>Affordable, compact rides</p>
          </div>{/* car details */}
          <h2 className='text-xl font-semibold'>₹193.20</h2>{/* price */}
        </div>

      </div>
    </div>
  )
}

export default VehiclePanel