import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


const CaptainProtectWrapper = ({children}) => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  },[token])

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectWrapper