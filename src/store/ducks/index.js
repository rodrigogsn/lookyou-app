import { combineReducers } from "redux";

import { reducer as auth } from "./auth";
import { reducer as firebaseImages } from "./firebaseImages";
import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  auth,
  firebaseImages,
  toastr
});
