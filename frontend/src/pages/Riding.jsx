import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const Riding = () => {
  const { rideData} = useContext(UserDataContext);
  
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  
  useEffect(() => {
      
      const rideEndHandler = () => {
        navigate(`/home`);
      }
  
      socket.on('ride-ended', rideEndHandler);
      
      // Cleanup listener on unmount
      return () => {
        socket.off('ride-started', rideEndHandler);
      };
    }, [socket]);


  return (
    <div className='h-screen'>
    <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-5-line"></i>
    </Link>
    <div className='h-1/2'>
  
        <LiveTracking />

    </div>
    <div className='h-1/2 p-4'>
    <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>
            {rideData?.captain.fullname.firstname}
            {/* captain naam */}
            </h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>
            {/* vehicle plate */}
            {rideData?.captain.vehicle.plate}
            </h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'> 
            {/* otp */}
             {rideData?.otp} 
             </h1>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>From:</h3>
              <p className='text-sm -mt-1 text-gray-700'>
                {/* jha hai abhi */}
                {rideData?.pickup}
                </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>To:</h3>
              <p className='text-sm -mt-1 text-gray-700'>
                {/* jha jana hai */}
                {rideData?.destination}
                </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>
                {/* paisa */}
                ₹{rideData?.fare} 
                </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
      </div>
        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
    </div>
</div>
  )
}

export default Riding