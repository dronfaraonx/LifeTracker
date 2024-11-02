import React, { useState } from 'react';
import { useUser } from '../../../context/auth';
import { IconButton, ListItemIcon, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import { useCart } from '../../../context/CountCart';


const API_URL = import.meta.env.VITE_API_URL;

const LogoutButton: React.FC = () => {
  const { setUser } = useUser();
  const {eraseCartCounter} = useCart()

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleLogout = async (): Promise<void> => {
    setIsLoading(true);
    eraseCartCounter()

    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        setUser(null);
        navigate('/'); 
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleLogout}
      
        sx={{ color: "black" }}>
          <Logout fontSize="small"/>
      </IconButton>
    </>
  );
};

export default LogoutButton;
