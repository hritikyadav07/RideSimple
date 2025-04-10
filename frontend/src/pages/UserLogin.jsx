import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logoWhite.png'
import image from '../assets/bg.jpg';


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const user = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);

      if(response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        
        // Check for incomplete rides
        try {
          const ridesResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/rides/active`,
            {
              headers: { Authorization: `Bearer ${data.token}` }
            }
          );
          
          if (ridesResponse.data && ridesResponse.data.ride) {
            // If there's an active ride, set it in context and redirect to riding
            setRideData(ridesResponse.data.ride);
            navigate('/riding');
          } else {
            navigate('/home');
          }
        } catch (rideError) {
          console.error("Error checking active rides:", rideError);
          navigate('/home'); // Fallback to home if the check fails
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
    
    setEmail('');
    setPassword('');
  } 

  return (
    <div className="p-5 sm:p-7 flex flex-col justify-between min-h-screen bg-cover bg-center"
         style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full max-w-md mx-auto"> 
        <img className='w-64 sm:w-80 mb-8' src={logo} alt="RideSimple Logo" />

        {error && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={(e)=>{submitHandler(e)}} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2 text-white">Email</h3>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 mb-4 rounded-lg px-4 py-3 w-full text-gray-800 text-lg"
              required 
              placeholder="email@example.com" 
              disabled={isLoading}
            />
          </div>
          
          <div>
            <h3 className="text-lg text-white font-medium mb-2">Password</h3>
            <input 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 mb-4 rounded-lg px-4 py-3 w-full text-gray-800 text-lg"
              required 
              placeholder="password" 
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-gray-900 text-white font-semibold mb-3 rounded-lg px-4 py-3 w-full text-lg disabled:opacity-70"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <p className="text-center text-white">New Here? <Link to='/signup' className='text-blue-300 hover:text-blue-200'>Create New Account</Link></p>
        </form>
      </div>
      
      <div className="w-full max-w-md mx-auto mt-8">
        <Link to='/captain-login' className="bg-yellow-600 flex items-center justify-center w-full text-white font-semibold mb-2 rounded-lg px-4 py-3 text-lg hover:bg-yellow-700 transition-colors">
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin