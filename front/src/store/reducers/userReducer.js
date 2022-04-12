import { AUTH_USER } from "../actions/actionTypes";

export default userReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      console.log("%c로그인!", "color: #d93d1a;");
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
