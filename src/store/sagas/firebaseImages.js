import { call, put } from "redux-saga/effects";
import FirebaseService from "../../services/FirebaseService";

import ImagesActions from "../ducks/firebaseImages";

export function* list({ onSuccess, onError }) {
  try {
    const response = yield call(FirebaseService.getImagesStore);

    yield put(ImagesActions.listImagesSuccess(response.data));

    onSuccess(response);
  } catch (err) {
    onError(err);
  }
}
