import { call, put } from "redux-saga/effects";
import FirebaseService from "../../services/FirebaseService";

import { actions as toastrActions } from "react-redux-toastr";

import AuthActions from "../ducks/auth";

export function* signIn({ email, password, onSuccess, onError }) {
  try {
    const response = yield call(FirebaseService.loginUser, email, password);

    yield put(AuthActions.signInSuccess(response));

    onSuccess(response);
  } catch (err) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Falha no Login",
        message: "Verifique seu Email/Senha!"
      })
    );
    onError(err);
  }
}

export function* signOut({ onSuccess }) {
  yield call(FirebaseService.logoutUser);

  onSuccess();
}
