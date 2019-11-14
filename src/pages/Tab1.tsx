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
import { add } from "ionicons/icons";
import React from "react";

type Tab1State = {
  view: string;
};
class Tab1 extends React.Component<{}, Tab1State> {
  constructor(props: any) {
    super(props);

    this.state = {
      view: "pictures"
    };
  }

  changeView(newView: any) {
    this.setState({ view: newView });
  }

  render() {
    let viewContent;

    if (this.state.view == "pictures") {
      viewContent = (
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonImg src="" />
            </IonCol>
          </IonRow>
        </IonGrid>
      );
    } else {
      viewContent = (
        <IonCard>
          <img src="/assets/shapes.svg" alt="" />
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Welcome to Ionic</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg src="" />
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
                this.changeView("pictures");
              }}
            >
              <IonLabel>Roupas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              onClick={() => {
                this.changeView("looks");
              }}
            >
              <IonLabel>Looks</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {viewContent}

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  }
}

export default Tab1;
