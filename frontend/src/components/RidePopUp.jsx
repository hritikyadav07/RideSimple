import React from 'react'
import contact from '../assets/contact.jpg'

const RidePopUp = (props) => {
    // console.log(props.ride)
    
    return (
        <div className='text-white'>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-gray-700 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 rounded-full object-cover w-12' src={contact} alt="" />
                    <h2 className='text-lg font-medium'>
                        {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
                        </h2>
                </div>
                <h5 className='text-lg font-semibold text-blue-400'>2.2 KM</h5>
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
                            <h3 className='text-lg font-medium'>₹
                                {props.ride?.fare} 
                                </h3>
                            <p className='text-sm -mt-1 text-gray-400'>Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 w-full'>
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.confirmRide()

                    }} className='bg-yellow-600 w-full text-white font-semibold p-2 px-10 rounded-lg hover:bg-green-700'>Accept</button>

                    <button onClick={() => {
                        props.setRidePopupPanel(false)

                    }} className='mt-2 w-full bg-gray-600 text-white font-semibold p-2 px-10 rounded-lg hover:bg-gray-700'>Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp