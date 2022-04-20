import { createStore, applyMiddleware } from "redux";
<<<<<<< HEAD
import { userReducer } from "./reducers/userReducer";
=======
import rootReducer from "./reducers";
>>>>>>> origin/feature-login-front
import ReduxThunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
