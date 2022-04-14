import { createStore, applyMiddleware } from "redux";
import { userReducer } from "./reducers/userReducer";
import ReduxThunk from "redux-thunk";

const store = createStore(userReducer, applyMiddleware(ReduxThunk));

export default store;
