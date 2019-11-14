import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from "@ionic/react";

class Login extends React.Component {
  render() {
    return (
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput type="password"></IonInput>
        </IonItem>
        <IonButton>Entrar</IonButton>
      </IonContent>
    );
  }
}

export default Login;
