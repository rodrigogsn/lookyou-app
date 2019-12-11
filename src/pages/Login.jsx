import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonImg,
  IonLoading
} from "@ionic/react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "../store/ducks/auth";

import "./Login.scss";
import logo from "../assets/img/logo.png";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState({
    show: false,
    message: "Carregando..."
  });

  const loginUser = (props, email, password) => {
    const { signInRequest } = props;

    setLoading({ show: true, message: "Carregando..." });

    signInRequest(
      email,
      password,
      async firebaseUser => {
        setLoading({ show: false, message: "Carregando..." });

        props.history.push("/gallery");
      },
      error => {
        setLoading({ show: false, message: "Carregando..." });
        console.log(error);
      }
    );
  };

  return (
    <IonPage>
      <IonContent>
        <IonImg src={logo} alt="Lookyou Logo" className="logo" />

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={email}
            onIonChange={e => setEmail(e.detail.value)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={e => setPassword(e.detail.value)}
          ></IonInput>
        </IonItem>

        <IonButton
          onClick={() => {
            loginUser(props, email, password);
          }}
        >
          Entrar
        </IonButton>

        <IonText>
          <p>
            Ainda não tem uma conta? <a>Crie sua conta.</a>
          </p>
        </IonText>
        <IonLoading
          isOpen={loading.show}
          onDidDismiss={() =>
            setLoading({ show: false, message: "Carregando..." })
          }
          message={loading.message}
        />
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(Login);
