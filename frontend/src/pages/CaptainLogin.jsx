import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});


  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({email, password});
    
    setEmail('');
    setPassword('');

  } 

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div> 
        <img className='w-14 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form onSubmit={(e)=>{submitHandler(e)}} >
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input 
            type="email" 
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required 
            placeholder="email@example.com" 
          />
          <h3 className="text-lg font-medium mb-3">Enter Password</h3>
          <input 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded border px-4 py-2 w-full text-lg placeholder:text-base"
            required 
            placeholder="password" 
          />
          <button className="bg-[#111] text-white font-semibold  mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Login</button>
          <p className="text-center">Join a Fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
        </form>
      </div>
      <div>
        <Link to='/login' className="bg-[#d5622d] flex items-center justify-center w-full text-white font-semibold  mb-2 rounded px-4 py-2 text-lg placeholder:text-base">
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin