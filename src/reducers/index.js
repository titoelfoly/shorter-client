import { combineReducers } from "redux";
import shorterReducer from "./shorterReducer";
import authReducers from "./authReducers";

export default combineReducers({
  shorter: shorterReducer,
  auth: authReducers,
});
