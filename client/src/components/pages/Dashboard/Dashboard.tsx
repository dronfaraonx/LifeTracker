// import React, { useEffect } from 'react';
// import axios from 'axios';
import { useUser } from '../../../context/auth';

const Dashboard = () => {
  const { user } = useUser();
  return (
    
    <h1>Dashboard Page, {user.name}</h1>
  );
};

export default Dashboard;
