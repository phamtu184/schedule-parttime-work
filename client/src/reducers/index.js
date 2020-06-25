import { combineReducers } from "redux";
import authReducer from "./auth";
import settingReducer from "./setting";
import scheduleReducer from "./schedule";

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  schedule: scheduleReducer,
});
export default rootReducer;
