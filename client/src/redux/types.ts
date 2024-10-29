export interface User {
  id: number;
  email: string;
  name: string;
}

export interface UserState {
  user: User | null;
}

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

interface SetUserAction {
  type: typeof SET_USER;
  payload: User | null; 
}

interface ClearUserAction {
  type: typeof CLEAR_USER;
}

export type UserActionTypes = SetUserAction | ClearUserAction;
