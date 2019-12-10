import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./theme/globals.scss";

import ReduxToastr from "react-redux-toastr";

import { Provider } from "react-redux";
import store from "./store";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr />
    <App />
  </Provider>,
  document.getElementById("root")
);
