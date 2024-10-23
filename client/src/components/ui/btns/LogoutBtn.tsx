import React, { useState } from 'react';
import { useUser } from '../../../context/auth';

const API_URL = process.env.REACT_APP_API_URL;

const LogoutButton: React.FC = () => {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

const handleLogout = async (): Promise<void> => {
  setIsLoading(true);
  setErrorMessage(null);

  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', 
    });

    if (response.ok) {
      setUser(null); 
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
      <button onClick={handleLogout} className="btn btn-link nav-link" disabled={isLoading}>
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
      {errorMessage && <div className="text-danger">{errorMessage}</div>} 
    </>
  );
};

export default LogoutButton;
