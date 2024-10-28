import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './auth';
const CartContext = createContext(0);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartCounterProvider = ({ children }) => {
  const [cartCounter, setCartCounter] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      const currentCount = parseInt(localStorage.getItem(`cartCount_${user.id}`)) || 0;
      setCartCounter(currentCount);
    }
  }, [user]);

  const handleAddtoCart = (plantName) => {
    if (user?.id) {
      const currentCount = parseInt(localStorage.getItem(`cartCount_${user.id}`)) || 0;
      const newCount = currentCount + 1;

      localStorage.setItem(`cartCount_${user.id}`, newCount); 
      setCartCounter(newCount);
      console.log(`Новый заказ для юзера ${user.id}:`, newCount);
    } else {
      console.log('Не залогинен');
    }
  };

  return (
    <CartContext.Provider value={{ cartCounter, handleAddtoCart }}>
      {children}
    </CartContext.Provider>
  );
};
