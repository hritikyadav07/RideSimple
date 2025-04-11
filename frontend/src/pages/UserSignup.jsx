import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';
import logo from '../assets/logoWhite.png';
import image from '../assets/bg.jpg';

const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState('')

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (err) {
      console.error("Signup error:", err)
      setError(err.response?.data?.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }
  
  return (
    <div>
      <div className='p-5 sm:p-7 min-h-screen flex flex-col justify-between bg-black bg-cover bg-center'
      style={{ backgroundImage: `url(${image})` }}
      >
        <div className="w-full max-w-md mx-auto">
          <img className='w-64 sm:w-80 mb-6' src={logo} alt="RideSimple Logo" />

          {error && (
            <div className="bg-red-500 text-white p-3 mb-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={(e) => submitHandler(e)} className="space-y-6">
            <div>
              <h3 className='text-lg text-white font-medium mb-3'>What's your name</h3>
              <div className='flex flex-col sm:flex-row gap-4 mb-6'>
                <div className="w-full sm:w-1/2">
                  <input
                    required
                    className='bg-gray-100 w-full rounded-lg px-4 py-3 text-gray-800 text-lg'
                    type="text"
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                  <input
                    className='bg-gray-100 w-full rounded-lg px-4 py-3 text-gray-800 text-lg'
                    type="text"
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-medium mb-2 text-white'>What's your email</h3>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-gray-100 mb-6 rounded-lg px-4 py-3 w-full text-gray-800 text-lg'
                type="email"
                placeholder='email@example.com'
                disabled={isLoading}
              />
            </div>

            <div>
              <h3 className='text-lg font-medium mb-2 text-white'>Create Password</h3>
              <input
                className='bg-gray-100 mb-6 rounded-lg px-4 py-3 w-full text-gray-800 text-lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                type="password"
                placeholder='password'
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className='bg-gray-900 text-white font-semibold mb-3 rounded-lg px-4 py-3 w-full text-lg disabled:opacity-70'
            >
              {isLoading ? 'Creating Account...' : 'Create account'}
            </button>

            <p className='text-center text-white'>Already have an account? <Link to='/login' className='text-yellow-400 hover:text-yellow-300'>Login here</Link></p>
          </form>
        </div>
        
        <div className="mt-8">
          <p className='text-[10px] text-white leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup