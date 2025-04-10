import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout' 
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import { UserDataContext } from './context/UserContext'
import { CaptainDataContext } from './context/CaptainContext'

function App() {
  const { user, loading: userLoading } = useContext(UserDataContext);
  const { captain, loading: captainLoading } = useContext(CaptainDataContext);

  // Show loading screen while authentication is being checked
  if (userLoading || captainLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading RideSimple...</div>
      </div>
    );
  }

  // Determine where to redirect the root path based on authentication state
  const getHomeRedirect = () => {
    if (user) {
      return <Navigate to="/home" replace />;
    } else if (captain) {
      return <Navigate to="/captain-home" replace />;
    } else {
      return <Navigate to="/start" replace />;
    }
  };

  return (
    <div className='h-screen w-screen'>
      <Routes>
        {/* Root path handles redirect based on auth state */}
        <Route path="/" element={getHomeRedirect()} />
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        } />
        <Route path='/start' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/riding' element={<Riding/>} />
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
          }/>
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-login' element={<CaptainLogin/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper> 
        } />
        <Route path='/captain-logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>
          }/>
        <Route path='/captain-riding' element={<CaptainRiding/>} />
      </Routes>
    </div>
  )
}

export default App