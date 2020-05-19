import { combineReducers } from "redux";
import authReducer from "./auth";
import settingReducer from "./setting";

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
});
export default rootReducer;
