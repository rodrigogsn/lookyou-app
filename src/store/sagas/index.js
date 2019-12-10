import { all, takeLatest } from "redux-saga/effects";

import { signIn, signOut } from "./auth";
import { AuthTypes } from "../ducks/auth";

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut)
  ]);
}
