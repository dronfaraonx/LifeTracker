import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './auth';
import axios from 'axios';

export interface CartContextType {
  cartCounter: number;
  handleAddtoCartCounter: (quantity: number) => void;
  handleRemoveFromCartCounter: (quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  return useContext(CartContext);
};

interface CartCounterProps {
  children: ReactNode;
}

const API_URL = import.meta.env.VITE_API_URL;

export const CartCounterProvider: React.FC<CartCounterProps> = ({ children }) => {
  const [cartCounter, setCartCounter] = useState<number>(0);
  const { user } = useUser();

useEffect(() => {
  if (user?.id) {
    const fetchQuantity = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cart/context/${user.id}`);
        const fetchedQuantityData = response.data;
        const allTotal = fetchedQuantityData.reduce((acc, plant) => acc + plant.quantity, 0);
        setCartCounter(allTotal);
        localStorage.setItem(`cartCount_${user.id}`, allTotal.toString());
      } catch (error) {
        console.log("Ошибка при получении количества растений из корзины", error);
      }
    };
    
    const storedCount = localStorage.getItem(`cartCount_${user.id}`);
    setCartCounter(storedCount ? parseInt(storedCount, 10) : 0);

    fetchQuantity();
  }
}, [user]);


  const handleAddtoCartCounter = (quantity: number) => {
    if (user?.id) {
      const newCount = cartCounter + quantity;
      
      localStorage.setItem(`cartCount_${user.id}`, newCount.toString());
      setCartCounter(newCount); 
    } else {
      console.log('Не залогинен');
    }
  };

  const handleRemoveFromCartCounter = (quantity: number) => {
    if (user?.id) {
      const newCount = Math.max(cartCounter - quantity, 0);
      localStorage.setItem(`cartCount_${user.id}`, newCount.toString());
      setCartCounter(newCount); 
    }
  };

  return (
    <CartContext.Provider value={{ cartCounter, handleAddtoCartCounter, handleRemoveFromCartCounter }}>
      {children}
    </CartContext.Provider>
  );
};
