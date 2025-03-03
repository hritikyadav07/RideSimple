import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import contact from '../assets/contact.jpg'


const FinishRide = (props) => {

    const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }

    return (
        <div className='text-white'>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setFinishRidePanel(!props.finishRidePanel)
            }}><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
            <div className='flex items-center justify-between p-4 border-2 border-blue-500 bg-gray-700 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 rounded-full object-cover w-12' src={contact} alt="" />
                    <h2 className='text-lg font-medium'>
                        {props.ride?.user.fullname.firstname}
                    </h2>
                </div>
                <h5 className='text-lg font-semibold text-blue-400'>{props.ride?.distance}km</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-700'>
                        <i className="ri-map-pin-user-fill text-yellow-400"></i>
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
                            <p className='text-sm -mt-1 text-gray-400'>Cash </p>
                        </div>
                    </div>
                </div>

                <div className='mt-10 w-full'>
                    <button
                        onClick={endRide}
                        className='w-full mt-5 flex text-lg justify-center bg-yellow-600 hover:bg-yellow-700 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>
                        <p className='text-red-400 mt-3 text-xs'>Click On Finish ride Button if You have received the payment</p>
                </div>
            </div>
        </div>
    )
}

export default FinishRide