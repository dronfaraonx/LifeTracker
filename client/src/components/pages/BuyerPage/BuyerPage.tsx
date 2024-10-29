import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSession } from '../../../redux/actions/userActions'; // Adjust the path accordingly

const BuyerPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user); // Adjust the type according to your state structure

  useEffect(() => {
    dispatch(fetchUserSession());
  }, [dispatch]);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>Please log in.</h1>
      )}
    </div>
  );
};

export default BuyerPage;
