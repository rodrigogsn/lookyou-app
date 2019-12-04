import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./theme/globals.scss";
import { AppContextProvider } from "./State";

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById("root")
);
