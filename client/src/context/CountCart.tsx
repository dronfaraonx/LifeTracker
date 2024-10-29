import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './auth';

export interface CartContextType {
  cartCounter: number;
  handleAddtoCartCounter: (plantName: string) => void;
  handleRemoveFromCartCounter: (quantity: number) => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  return useContext(CartContext);
};

interface CartCounterProps {
  children: ReactNode;
}

export const CartCounterProvider:React.FC<CartCounterProps> = ({ children }) => {
  const [cartCounter, setCartCounter] = useState<number>(0);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      const currentCount = parseInt(localStorage.getItem(`cartCount_${user.id}`) || '0', 10);
      setCartCounter(currentCount);
    }
  }, [user]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddtoCartCounter = (plantName: string) => {
    if (user?.id) {
      const currentCount = parseInt(localStorage.getItem(`cartCount_${user.id}`) || '0', 10);
      const newCount = currentCount + 1;

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

  return (
    <CartContext.Provider value={{ cartCounter, handleAddtoCartCounter, handleRemoveFromCartCounter }}>
      {children}
    </CartContext.Provider>
  );
};