import React, { useContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";

import { AppContext } from "./State";

import { IonReactRouter } from "@ionic/react-router";
import { shirt, calendar, settings } from "ionicons/icons";

import Gallery from "./pages/Gallery";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App = () => {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(AppContext);
    return (
      <Route
        {...rest}
        render={props =>
          state.login_data !== null ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )
        }
      />
    );
  };

  const router = (
    <IonRouterOutlet>
      <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
      <Route path="/login" component={Login} exact={true} />
      <Route path="/gallery" component={Gallery} exact={true} />
      <Route path="/calendar" component={Calendar} exact={true} />
      <Route path="/settings" component={Settings} exact={true} />
      {/* <PrivateRoute path="/gallery" component={Gallery} exact={true} />
      <PrivateRoute path="/calendar" component={Calendar} exact={true} />
      <PrivateRoute path="/settings" component={Settings} exact={true} /> */}
    </IonRouterOutlet>
  );

  const tabs = (
    <IonTabs>
      {router}
      <IonTabBar slot="bottom">
        <IonTabButton tab="gallery" href="/gallery">
          <IonIcon icon={shirt} />
          <IonLabel>Galeria</IonLabel>
        </IonTabButton>
        <IonTabButton tab="calendar" href="/calendar">
          <IonIcon icon={calendar} />
          <IonLabel>Calendário</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={settings} />
          <IonLabel>Config</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );

  return (
    <IonApp>
      <IonReactRouter>
        {currentRoute === "/login" || currentRoute === "/" ? router : tabs}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
