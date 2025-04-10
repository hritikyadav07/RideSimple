import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const Riding = () => {
  const { rideData, setRideData } = useContext(UserDataContext);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5); // For countdown
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  // Handle ride ended event
  useEffect(() => {
    const rideEndHandler = () => {
      navigate(`/home`);
    }

    socket.on('ride-ended', rideEndHandler);
    
    // Cleanup listener on unmount
    return () => {
      socket.off('ride-ended', rideEndHandler);
    };
  }, [socket, navigate]);

  // Handle countdown for payment redirect
  useEffect(() => {
    if (paymentInitiated && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (paymentInitiated && timeLeft === 0) {
      navigate('/home');
    }
  }, [paymentInitiated, timeLeft, navigate]);

  const handlePayment = () => {
    setPaymentInitiated(true);
    // Display payment confirmation message with countdown
  };

  const handleNavigateHome = () => {
    setShowConfirmation(true);
  };

  const cancelNavigation = () => {
    setShowConfirmation(false);
  };

  const confirmNavigation = () => {
    navigate('/home');
  };

  // Check if ride data exists
  if (!rideData) {
    return (
      <div className='h-screen flex items-center justify-center bg-gray-900 text-white'>
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Loading ride information...</h2>
          <p className="mt-2 text-gray-400">If this takes too long, please return to <Link to="/home" className="text-blue-400 hover:underline">home</Link>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen bg-gray-900 text-white overflow-hidden'>
      <div onClick={handleNavigateHome} className='fixed right-4 top-4 z-10 h-10 w-10 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer'>
        <i className="text-lg font-medium ri-home-5-line"></i>
      </div>
      
      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-gray-800 p-6 rounded-xl max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-2">Leave ongoing ride?</h3>
            <p className="mb-4">Your ride is still in progress. Are you sure you want to leave?</p>
            <div className="flex gap-3">
              <button 
                onClick={cancelNavigation}
                className="w-1/2 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600"
              >
                Stay
              </button>
              <button 
                onClick={confirmNavigation}
                className="w-1/2 bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Map section - top half */}
      <div className='h-1/2'>
        <LiveTracking />
      </div>
      
      {/* Ride details section - bottom half */}
      <div className='h-1/2 p-4 bg-gray-800 overflow-y-auto'>
        {/* Payment notification */}
        {paymentInitiated && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-gray-800 p-6 rounded-xl max-w-sm w-full text-center">
              <div className="text-green-500 text-4xl mb-3">
                <i className="ri-check-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
              <p className="mb-4">Thank you for riding with us.</p>
              <p className="text-sm text-gray-400">Redirecting in {timeLeft} seconds...</p>
              <button 
                onClick={() => navigate('/home')} 
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      
        {/* Captain and vehicle info */}
        <div className='flex items-center justify-between mb-6'>
          <img 
            className='h-16 w-16 rounded-full object-cover' 
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
            alt="Driver" 
          />
          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize text-white'>
              {rideData?.captain?.fullname?.firstname || "Captain"}
            </h2>
            <h4 className='text-xl font-semibold text-blue-400'>
              {rideData?.captain?.vehicle?.plate || ""}
            </h4>
            <p className='text-sm text-gray-400'>Maruti Suzuki Alto</p>
            <h1 className='text-lg font-semibold text-white'> 
              {rideData?.otp || ""} 
            </h1>
          </div>
        </div>

        {/* Ride details */}
        <div className='w-full bg-gray-700 rounded-xl p-4 mb-6'>
          {/* Pickup location */}
          <div className='flex items-center gap-5 p-3 border-b border-gray-600'>
            <i className="ri-map-pin-user-fill text-2xl text-blue-400"></i>
            <div>
              <h3 className='text-lg font-medium'>From:</h3>
              <p className='text-sm text-gray-400'>
                {rideData?.pickup || "Loading..."}
              </p>
            </div>
          </div>
          
          {/* Destination */}
          <div className='flex items-center gap-5 p-3 border-b border-gray-600'>
            <i className="text-2xl ri-map-pin-2-fill text-blue-400"></i>
            <div>
              <h3 className='text-lg font-medium'>To:</h3>
              <p className='text-sm text-gray-400'>
                {rideData?.destination || "Loading..."}
              </p>
            </div>
          </div>
          
          {/* Fare info */}
          <div className='flex items-center gap-5 p-3'>
            <i className="text-2xl ri-currency-line text-green-400"></i>
            <div>
              <h3 className='text-lg font-medium'>
                ₹{rideData?.fare || "0"} 
              </h3>
              <p className='text-sm text-gray-400'>Cash</p>
            </div>
          </div>
        </div>
        
        {/* Payment button */}
        <button 
          className='w-full bg-yellow-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition'
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