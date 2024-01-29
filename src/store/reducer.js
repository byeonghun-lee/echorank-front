import { combineReducers } from "redux";
import { commonReducer } from "store/service/commonSlice";
import { authReducer } from "store/service/auth/authSlice";
import { followRelationReducer } from "store/service/followRelation/followRelationSlice";

export default combineReducers({
    common: commonReducer,
    auth: authReducer,
    followRelation: followRelationReducer,
});
