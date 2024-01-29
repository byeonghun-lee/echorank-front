import { call, put, takeLatest } from "redux-saga/effects";
import * as followRelationAPI from "api/followRelation";
import {
    getList,
    getListSuccess,
} from "store/service/followRelation/followRelationSlice";

function* getFollowRelationList(action) {
    try {
        const result = yield call(followRelationAPI.getList, action.payload);
        yield put(getListSuccess(result.data));
    } catch (error) {
        console.log("getList saga", error);
    }
}

export function* followRelationSaga() {
    yield takeLatest(getList, getFollowRelationList);
}
