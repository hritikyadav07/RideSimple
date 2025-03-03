import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const Riding = () => {
  const { rideData} = useContext(UserDataContext);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  
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

  const handlePayment = () => {
    setPaymentInitiated(true);
    
    // Display some payment confirmation or processing message
    alert("Payment successful! Redirecting to home page in 5 seconds.");
    
    // Redirect to home after 5 seconds
    setTimeout(() => {
      navigate('/home');
    }, 5000);
  };

  return (
    <div className='h-screen bg-gray-900 text-white'>
    <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-gray-700 text-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-5-line"></i>
    </Link>
    <div className='h-1/2'>
  
        <LiveTracking />

    </div>
    <div className='h-1/2 p-4 bg-gray-800'>
    <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize text-white'>
            {rideData?.captain.fullname.firstname}
            </h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1 text-blue-400'>
            {rideData?.captain.vehicle.plate}
            </h4>
          <p className='text-sm text-gray-400'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold text-white'> 
             {rideData?.otp} 
             </h1>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-700'>
            <i className="ri-map-pin-user-fill text-blue-400"></i>
            <div>
              <h3 className='text-lg font-medium'>From:</h3>
              <p className='text-sm -mt-1 text-gray-400'>
                {rideData?.pickup}
                </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-700'>
            <i className="text-lg ri-map-pin-2-fill text-blue-400"></i>
            <div>
              <h3 className='text-lg font-medium'>To:</h3>
              <p className='text-sm -mt-1 text-gray-400'>
                {rideData?.destination}
                </p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line text-green-400"></i>
            <div>
              <h3 className='text-lg font-medium'>
                ₹{rideData?.fare} 
                </h3>
              <p className='text-sm -mt-1 text-gray-400'>Cash</p>
            </div>
          </div>
        </div>
      </div>
        <button 
          className='w-full mt-5 bg-yellow-600 text-white font-semibold p-2 rounded-lg hover:bg-green-700 transition'
          onClick={handlePayment}
          disabled={paymentInitiated}
        >
          {paymentInitiated ? 'Processing...' : 'Make a Payment'}
        </button>
    </div>
</div>
  )
}

export default Riding