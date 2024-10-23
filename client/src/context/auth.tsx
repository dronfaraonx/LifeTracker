import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}
const API_URL = import.meta.env.VITE_API_URL;

const UserContext = createContext<UserContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
 
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading] = useState(true);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/check-session`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data.user);
      } else if (response.status === 401) {
        console.log('Error: Unauthorized access');
      } else {
        setUser(null); 
      }
    } catch (error) {
      console.error("Failed to fetch user session:", error);
      // setUser(null); 
    }
  };

  fetchUser();
}, []);


  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
