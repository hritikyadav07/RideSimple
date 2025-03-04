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
  // const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password
    }

    const response = await  axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);

    if(response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
    
    setEmail('');
    setPassword('');

  } 

  return (
    <div className="p-7 flex flex-col justify-between h-screen bg-cover"
          style={{ backgroundImage: `url(${image})` }}
    >
      <div> 
      <img className='w-80 ' src={logo} alt="" />

        <form onSubmit={(e)=>{submitHandler(e)}} >
          <h3 className="text-lg font-medium mb-2 text-white">What's your Email</h3>
          <input 
            type="email" 
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required 
            placeholder="email@example.com" 
          />
          <h3 className="text-lg text-white font-medium mb-3">Enter Password</h3>
          <input 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded border px-4 py-2 w-full text-lg placeholder:text-base"
            required 
            placeholder="password" 
          />
          <button className="bg-[#111] text-white font-semibold  mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Login</button>
          <p className="text-center text-white">New Here? <Link to='/signup' className='text-blue-600'>Create New Account</Link></p>
        </form>
      </div>
      <div>
        <Link to='/captain-login' className="bg-[#de9b0d] flex items-center justify-center w-full text-white font-semibold  mb-2 rounded px-4 py-2 text-lg placeholder:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin

//done with the user login page