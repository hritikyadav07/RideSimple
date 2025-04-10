import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserDataContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch(err => {
        console.error("Authentication error:", err);
        localStorage.removeItem('token');
        setError("Session expired. Please login again.");
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <UserDataContext.Provider value={{ user, setUser, loading, error, logout }}>
      {children}
    </UserDataContext.Provider>
  );
};
