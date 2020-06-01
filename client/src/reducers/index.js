import { combineReducers } from "redux";
import authReducer from "./auth";
import settingReducer from "./setting";
import registerReducer from "./register";

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  register: registerReducer,
});
export default rootReducer;
