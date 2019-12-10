import React, { useContext } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "../store/ducks/auth";

import { Plugins } from "@capacitor/core";
import { signOut } from "../store/sagas/auth";

const { Storage } = Plugins;

const SettingsPage = props => {
  const logout = () => {
    const { signOut } = props;
    signOut(async () => {
      // await Storage.set({
      //   key: "user",
      //   value: JSON.stringify("")
      // });

      props.history.push("/login");
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configurações</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton
          onClick={() => {
            logout();
          }}
        >
          Sair
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SettingsPage);
