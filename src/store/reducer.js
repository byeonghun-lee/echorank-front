import { combineReducers } from "redux";
import { commonReducer } from "store/service/commonSlice";

export default combineReducers({ common: commonReducer });
