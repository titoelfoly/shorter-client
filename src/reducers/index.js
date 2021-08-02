import { combineReducers } from "redux";
import shorterReducer from "./shorterReducer";

export default combineReducers({
  shorter: shorterReducer,
});
