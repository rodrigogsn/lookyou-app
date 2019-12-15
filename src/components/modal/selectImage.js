import React from 'react';
import { IonModal, IonButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';

export const SelectImageModal= (props) => {   
  const cols = props.imagesURL.map(function(item, i) {
    return (
      <IonCol size="4" key={i}>
        <IonImg
          src={item}
          onClick={() => {props.onSelectImage(props.itensRef[i].id)}}
        />
      </IonCol>
    );
  });  

  return (
    <>
      <IonModal isOpen={props.showModal}>
        <IonGrid fixed>
          <IonRow>{cols}</IonRow>
        </IonGrid>


        <IonButton onClick={() => props.setShowModal({visible:false, ref: null})}>Close Modal</IonButton>
      </IonModal>
    </>
  );
};