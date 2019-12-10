import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  signInRequest: ["email", "password", "onSuccess", "onError"],
  signInSuccess: ["login_data"],
  signOut: ["onSuccess"]
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  signedIn: false,
  login_data: {}
};

export const success = (state, { login_data }) => {
  const newState = { signedIn: true, login_data };
  return (state = newState);
};

export const logout = state => {
  const newState = { signedIn: true, login_data: {} };
  return (state = newState);
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_IN_SUCCESS]: logout
});
