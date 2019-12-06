import React, { createContext, useReducer, useEffect } from "react";

import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

async function getObject(name) {
  // return new Promise(async resolve => {
  //   Storage.get({ key: name }).then(data => {
  //     resolve(JSON.parse(data.value));
  //   });
  // });
  const ret = await Storage.get({ key: "user" });
  return JSON.parse(ret.value);
}

let AppContext = createContext();

const initialState = {
  login_data: getObject("user")
};

let reducer = (state, action) => {
  switch (action.type) {
    case "setLogin": {
      return { ...state, login_data: action.login_data };
    }
    default: {
      return state;
    }
  }
};

console.log(initialState);

const AppContextProvider = props => {
  const fullInitialState = {
    ...initialState
  };

  let [state, dispatch] = useReducer(reducer, fullInitialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
