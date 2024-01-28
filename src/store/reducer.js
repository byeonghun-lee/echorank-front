import { combineReducers } from "redux";
import { commonReducer } from "store/service/commonSlice";
import { authReducer } from "store/service/auth/authSlice";

export default combineReducers({ common: commonReducer, auth: authReducer });
