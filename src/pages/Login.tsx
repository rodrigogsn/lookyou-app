import React from "react";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonImg
} from "@ionic/react";

import "./Login.scss";
import logo from "../assets/img/logo.png";

class Login extends React.Component {
  render() {
    return (
      <IonContent>
        <IonImg src={logo} alt="Lookyou Logo" className="logo" />

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput type="password"></IonInput>
        </IonItem>

        <IonButton>Entrar</IonButton>

        <IonText>
          <p>
            Ainda não tem uma conta? <a>Crie sua conta.</a>
          </p>
        </IonText>
      </IonContent>
    );
  }
}

export default Login;
