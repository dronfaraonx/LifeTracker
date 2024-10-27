import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(0);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartCounterProvider = ({ children }) => {
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    const currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
    setCartCounter(currentCount);
  }, []);

  const handleAddtoCart = (plantName) => {
    const currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const newCount = currentCount + 1;

    localStorage.setItem('cartCount', newCount);
    setCartCounter(newCount);
    console.log(cartCounter);
    
  };

  return (
    <CartContext.Provider value={{ cartCounter, handleAddtoCart }}>
      {children}
    </CartContext.Provider>
  );
};
