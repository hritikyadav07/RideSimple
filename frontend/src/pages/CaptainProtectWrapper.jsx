import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { captain, loading } = useContext(CaptainDataContext);

  React.useEffect(() => {
    if (!loading && !captain) {
      navigate('/captain-login');
    }
  }, [captain, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!captain) {
    return null; // Will redirect in useEffect
  }

  return children;
};

export default CaptainProtectWrapper;