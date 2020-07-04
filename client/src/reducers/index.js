import { combineReducers } from "redux";
import authReducer from "./auth";
import settingReducer from "./setting";
import scheduleReducer from "./schedule";
import mainScheduleReducer from "./mainSchedule";

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  schedule: scheduleReducer,
  mainSchedule: mainScheduleReducer,
});
export default rootReducer;
