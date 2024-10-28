import React, { useState } from 'react';
import { useUser } from '../../../context/auth';
import { ListItemIcon, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';


const API_URL = import.meta.env.VITE_API_URL;

const LogoutButton: React.FC = () => {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleLogout = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);

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
      setErrorMessage('Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <MenuItem onClick={handleLogout}>
      <ListItemIcon >
          <Logout fontSize="small"/>
      </ListItemIcon>
      {isLoading ? 'Выхожу...' : 'Выйти'}
    </MenuItem>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </>
  );
};

export default LogoutButton;
