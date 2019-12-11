import { createReducer, createActions } from "reduxsauce";
import { storage_get, storage_set, storage_remove } from "../../services/storage";

const { Types, Creators } = createActions({
  signInRequest: ["email", "password", "onSuccess", "onError"],
  signInSuccess: ["login_data"],
  signOut: ["onSuccess"]
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  signedIn: storage_get("user") ? true : false,
  login_data: storage_get("user") || {}
};

export const success = (state, { login_data }) => {
  storage_set("user", login_data);
  const newState = { signedIn: true, login_data };
  return (state = newState);
};

export const logout = state => {
  storage_remove("user");
  const newState = { signedIn: true, login_data: {} };
  return (state = newState);
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_IN_SUCCESS]: logout
});
