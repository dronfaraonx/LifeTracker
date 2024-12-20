import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './auth';
import axios from 'axios';

export interface CartContextType {
  cartCounter: number;
  handleAddtoCartCounter: (quantity: number) => void;
  handleRemoveFromCartCounter: (quantity: number) => void;
  eraseCartCounter: () => void
}
const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};

interface CartCounterProps {
  children: ReactNode;
}
const API_URL = import.meta.env.VITE_API_URL;


export const CartCounterProvider:React.FC<CartCounterProps> = ({ children }) => {
  const [cartCounter, setCartCounter] = useState<number>(0);
  const { user } = useUser();


  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`${API_URL}/api/cart/check/${user.id}`);
          const totalQuantity = response.data.reduce((total: number, oneItem: { quantity: number }) => total + oneItem.quantity, 0);

          setCartCounter(totalQuantity);
          localStorage.setItem(`cartCount_${user.id}`, totalQuantity.toString());

          console.log('Fetched cart quantities: ', response.data);
        } catch {
        //no response
        }
      }
    };

    fetchCart();
  }, [user]);



  useEffect(() => {
    if (user?.id) {
      const currentCount = parseInt(localStorage.getItem(`cartCount_${user.id}`) || '0', 10);
      setCartCounter(currentCount);
    }
  }, [user]);

  const handleAddtoCartCounter = (quantity: number) => {

    if (user?.id) {

      const currentCount = parseInt(localStorage.getItem(`cartCount_${user.id}`) || '0', 10);
      
      const newCount = currentCount + quantity;
    
      localStorage.setItem(`cartCount_${user.id}`, newCount.toString()); 
      setCartCounter(newCount);
      
      console.log(`Новый заказ для юзера ${user.id}:`, newCount);
    } else {
      console.log('Не залогинен');
    }
  };

  const handleRemoveFromCartCounter = (quantity: number) => {
    if (user?.id) {
      const currentCount = parseInt(localStorage.getItem(`cartCount_${user.id}`) || '0', 10);
      const newCount = Math.max(currentCount - quantity, 0);
      localStorage.setItem(`cartCount_${user.id}`, newCount.toString());
      setCartCounter(newCount);
    }
  };

  const eraseCartCounter = () => {
    if (user?.id) {
      localStorage.removeItem(`cartCount_${user.id}`);
      setCartCounter(0);
      console.log(`Корзина пользователя ${user.id} была очищена.`);
    }
  };

  return (
    <CartContext.Provider value={{ cartCounter, handleAddtoCartCounter, handleRemoveFromCartCounter, eraseCartCounter }}>
      {children}
    </CartContext.Provider>
  );
};

