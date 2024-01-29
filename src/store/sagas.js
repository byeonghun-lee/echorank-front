import { all } from "redux-saga/effects";
import { authSaga } from "store/service/auth/authSaga";
import { followRelationSaga } from "store/service/followRelation/followRelationSaga";

export default function* rootSaga() {
    yield all([authSaga(), followRelationSaga()]);
}
