import { Dispatch } from 'redux';
import { User } from '../types';

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

const API_URL = import.meta.env.VITE_API_URL;


export function setUser(user: User | null) {
  type: SET_USER,
  payload: {user},
};

export function clearUser () {
  type: CLEAR_USER,
};

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
        dispatch(setUser(data.user));
      } else if (response.status === 401) {
        console.log('Unauthorized access');
        dispatch(clearUser());
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      console.error("Failed to fetch user session:", error);
      dispatch(clearUser());
    }
  };
};
