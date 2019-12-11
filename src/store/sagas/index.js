import { all, takeLatest } from "redux-saga/effects";

import { signIn, signOut } from "./auth";
import { list } from "./firebaseImages";

import { AuthTypes } from "../ducks/auth";
import { firebaseImagesTypes } from "../ducks/firebaseImages";

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),

    takeLatest(firebaseImagesTypes.LIST_IMAGES, list)
  ]);
}
