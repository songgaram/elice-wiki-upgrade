import { AUTH_USER, LOGOUT_USER } from "./actionTypes";

export const authUser = (user) => {
  return {
    type: AUTH_USER,
    payload: user,
  };
};

// export const logoutUser = (user) => {
//   return {
//     type: LOGOUT_USER,
//     payload: user
//   };
// };
