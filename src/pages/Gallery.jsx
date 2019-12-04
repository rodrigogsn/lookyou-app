import React, { useState, useContext } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonButton
} from "@ionic/react";
import { AppContext } from "../State";

import { add, camera, image } from "ionicons/icons";

import dummy1 from "../assets/img/dummy-1x1.png";
import dummy2 from "../assets/img/dummy-3x5.png";

const changeView = (newView, setView) => {
  setView(newView);
};

const GalleryPage = () => {
  const [view, setView] = useState("pictures");
  const { state, dispatch } = useContext(AppContext);
  console.log(state);

  let viewContent;

  if (view === "pictures") {
    viewContent = (
      <IonGrid fixed>
        <IonRow>
          <IonCol size="4">
            <IonImg src={dummy1} />
          </IonCol>
          <IonCol size="4">
            <IonImg src={dummy2} />
          </IonCol>
          <IonCol size="4">
            <IonImg src={dummy1} />
          </IonCol>

          <IonCol size="4">
            <IonImg src={dummy1} />
          </IonCol>
          <IonCol size="4">
            <IonImg src={dummy1} />
          </IonCol>
          <IonCol size="4">
            <IonImg src={dummy2} />
          </IonCol>

          <IonCol size="4">
            <IonImg src={dummy1} />
          </IonCol>
          <IonCol size="4">
            <IonImg src={dummy1} />
          </IonCol>
          <IonCol size="4">
            <IonImg src={dummy1} />
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  } else {
    viewContent = (
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Look 1</IonCardSubtitle>
          <IonCardTitle>Look Especial de Teste</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <IonImg src={dummy1} />
                <IonImg src={dummy2} />
                <IonImg src={dummy1} />
                <IonImg src={dummy1} />
              </IonCol>
              <IonButton>
                <IonIcon icon={add}></IonIcon>
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Galeria</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegment>
          <IonSegmentButton
            onClick={() => {
              changeView("pictures", setView);
            }}
          >
            <IonLabel>Roupas</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            onClick={() => {
              changeView("looks", setView);
            }}
          >
            <IonLabel>Looks</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {viewContent}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>

          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={image}></IonIcon>
            </IonFabButton>

            <IonFabButton>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default GalleryPage;
