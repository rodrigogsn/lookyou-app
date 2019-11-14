import React from "react";
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
import { IonReactRouter } from "@ionic/react-router";
import { apps, flash, send } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
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

type AppState = {
  currentRoute: string;
};

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentRoute: window.location.pathname
    };
  }

  render() {
    const router = (
      <IonRouterOutlet>
        <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/tab1" component={Tab1} exact={true} />
        <Route path="/tab2" component={Tab2} exact={true} />
        <Route path="/tab3" component={Tab3} />
      </IonRouterOutlet>
    );

    const tabs = (
      <IonTabs>
        {router}
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={flash} />
            <IonLabel>Tab One</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={apps} />
            <IonLabel>Tab Two</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={send} />
            <IonLabel>Tab Three</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
    return (
      <IonApp>
        <IonReactRouter>
          {this.state.currentRoute == "/login" || this.state.currentRoute == "/"
            ? router
            : tabs}
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default App;
