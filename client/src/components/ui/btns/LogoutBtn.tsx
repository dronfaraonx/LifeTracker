import React, { useState } from 'react';
import { useUser } from '../../../context/auth';
import { ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        navigate('/login'); 
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
  <ListItem 
      button 
      onClick={handleLogout} 
      disabled={isLoading}
      sx={{
        '&:hover': {
          background: 'linear-gradient(90deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)', // Use background instead of backgroundColor
        },
        color: 'white', 
        transition: 'background 0.3s ease', 
        borderRadius: '10px'
      }}
    >
      <ListItemText primary={isLoading ? 'Logging out...' : 'Logout'} />
    </ListItem>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* Show error message if any */}
    </>
  );
};

export default LogoutButton;
