import React, { createContext, useReducer } from "react";

let AppContext = createContext();

const initialState = {
  login_data: null
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

function AppContextProvider(props) {
  const fullInitialState = {
    ...initialState
  };

  let [state, dispatch] = useReducer(reducer, fullInitialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
