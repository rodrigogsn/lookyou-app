import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import store from "../store";

const privateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().auth.signedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  ></Route>
);

export default privateRoute;
