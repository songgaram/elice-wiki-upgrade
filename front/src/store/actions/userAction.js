import { AUTH_USER, LOGOUT_USER } from "./actionTypes";
// import * as Api from "";

export const authUser = () => {
  return {
    type: AUTH_USER,
    // payload: user
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    // payload: user
  };
};
