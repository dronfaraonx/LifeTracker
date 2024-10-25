// import React, { useEffect } from 'react';
// import axios from 'axios';
import { useUser } from '../../../context/auth';

const MainPage = () => {
  const { user } = useUser();
  return (
    <div></div>
    // <div>dashboard</div>
    // <h1>Dashboard Page, {user.name}</h1>
  );
};

export default MainPage;
