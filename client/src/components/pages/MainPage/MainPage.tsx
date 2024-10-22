// import React, { useEffect } from 'react';
// import axios from 'axios';
import { useUser } from '../../../context/auth';

const MainComponent = () => {
  const { user } = useUser();
  return (
    <div>
      {user ? (
        <p>Welcome back, {user.name}!</p>
      ) : (
        <p>Please log in ☝️</p>
      )}
    </div>
  );
};

export default MainComponent;
