import { all } from "redux-saga/effects";
import { authSaga } from "store/service/auth/authSaga";

export default function* rootSaga() {
    yield all([authSaga()]);
}
