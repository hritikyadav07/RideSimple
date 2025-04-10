import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from '../context/CaptainContext';

function CaptainLogout() {
    const [showConfirmation, setShowConfirmation] = useState(true);
    const navigate = useNavigate();
    const { logout } = useContext(CaptainDataContext);

    const handleLogout = async () => {
        await logout();
        navigate('/captain-login');
    };

    const cancelLogout = () => {
        navigate('/captain-home');
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
            {showConfirmation && (
                <div className="bg-gray-800 p-6 rounded-xl max-w-sm w-full">
                    <h2 className="text-xl font-bold mb-4 text-center">Confirm Logout</h2>
                    <p className="mb-6 text-center">Are you sure you want to logout?</p>
                    <div className="flex gap-3">
                        <button 
                            onClick={cancelLogout}
                            className="w-1/2 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="w-1/2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CaptainLogout;