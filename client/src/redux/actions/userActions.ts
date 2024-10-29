import { Dispatch } from 'redux';
import { SET_USER, CLEAR_USER, User, UserActionTypes } from '../types';

const API_URL = import.meta.env.VITE_API_URL;


export const fetchUserSession = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/check-session`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch({
          type: SET_USER,
          payload: data.user
        });
      } else if (response.status === 401) {
        dispatch({
          type: CLEAR_USER
        });
      }
    } catch (error) {
      console.error("Failed", error);
    }
  };
};
