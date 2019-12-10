import React, { useState, useContext, useEffect } from "react";
import { Plugins, CameraResultType } from "@capacitor/core";
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
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonButton,
  IonText,
  IonActionSheet,
  IonLoading
} from "@ionic/react";
import { AppContext } from "../State";
import "./Gallery.scss";

import FirebaseService from "../services/FirebaseService";

import ImgsViewer from "react-images-viewer";

import { add, heart, more, trash } from "ionicons/icons";

const { Camera } = Plugins;

const changeView = (newView, setView) => {
  setView(newView);
};

const GalleryPage = () => {
  const [view, setView] = useState("pictures");
  const [showActionSheet1, setShowActionSheet1] = useState(false);
  const [showActionSheet2, setShowActionSheet2] = useState(false);
  const [itensRef, setItensRef] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [picture, setPicture] = useState([]);
  const [looks, setLooks] = useState([]);

  const [loading, setLoading] = useState({
    show: false,
    message: "Carregando..."
  });

  const [selectedImage, setSelectedImage] = useState(false);

  const [showImageViewer, setShowImageViewer] = useState(false);

  const { state, dispatch } = useContext(AppContext);

  const fetchImages = async (showLoading = true) => {
    if (showLoading) {
      setLoading({ show: true, message: "Carregando imagens..." });
    }
    FirebaseService.getImagesStore(
      async images => {
        setItensRef(images);

        var urls = images.map(function(item) {
          return item.url;
        });

        setImagesURL(urls);

        FirebaseService.listLooks(
          async looks => {
            setLooks(looks);
            setLoading({ show: false, message: "Carregando imagens..." });
          },
          error => {
            setLoading({ show: false, message: "Carregando imagens..." });
            console.log(error);
          }
        );
      },
      error => {
        setLoading({ show: false, message: "Carregando imagens..." });
        console.log(error);
      }
    );
  };

  const deleteImage = async image => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      setLoading({ show: true, message: "Deletando imagem..." });
      FirebaseService.removeImage(
        image,
        async res => {
          setShowImageViewer(false);
          fetchImages(false);
          console.log(res);
        },
        error => {
          setLoading({ show: false, message: "Deletando imagem..." });
          console.log(error);
        }
      );
    }
  };

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    let pictureURL = image.dataUrl;

    setPicture(pictureURL);

    setLoading({ show: true, message: "Salvando Imagem..." });

    FirebaseService.uploadImage(
      pictureURL,
      async res => {
        fetchImages(false);
        console.log(res);
      },
      error => {
        setLoading({ show: false, message: "Salvando Imagem..." });
        console.log(error);
      }
    );
  };

  //GET ALL IMAGES
  useEffect(() => {
    fetchImages();
  }, []);

  let viewContent;

  const cols = imagesURL.map(function(item, i) {
    return (
      <IonCol size="4" key={i}>
        <IonImg
          src={item}
          onClick={() => {
            setShowImageViewer(true);
            setSelectedImage(i);
          }}
        />
      </IonCol>
    );
  });

  const look_card = looks.map(function(item, i) {
    console.log(item);
    return (
      <IonCard>
        <IonItem lines="none">
          <IonButton
            color="medium"
            strong="true"
            size="large"
            slot="end"
            fill="clear"
          >
            <IonIcon icon={heart}></IonIcon>
          </IonButton>
          <IonButton
            color="medium"
            strong="true"
            size="large"
            slot="end"
            fill="clear"
          >
            <IonIcon icon={more}></IonIcon>
          </IonButton>
        </IonItem>
        <IonCardHeader>
          <IonCardSubtitle>Look</IonCardSubtitle>
          <IonCardTitle>{item.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              {item.images.map(function(image) {
                return (
                  <div className="image-container">
                    <IonImg src={image} />
                  </div>
                );
              })}
            </IonRow>
          </IonGrid>

          <IonButton fill="outline">
            <IonIcon icon={add}></IonIcon> Peças
          </IonButton>
        </IonCardContent>
      </IonCard>
    );
  });

  if (view === "pictures") {
    viewContent = (
      <>
        <IonGrid fixed>
          <IonRow>{cols}</IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => takePicture()}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </>
    );
  } else {
    viewContent = (
      <>
        {look_card}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowActionSheet2(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </>
    );
  }

  return (
    <IonPage className="gallery-page">
      <IonContent>
        <IonText>
          <h1>Guarda-Roupa</h1>
          <h4>Seu galeria de roupas e acessórios</h4>
        </IonText>

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

        <IonActionSheet
          isOpen={showActionSheet1}
          onDidDismiss={() => setShowActionSheet1(false)}
          buttons={[
            {
              text: "Tirar Foto",
              handler: () => {
                takePicture();
              }
            },
            {
              text: "Carregar Foto",
              handler: () => {
                console.log("Carregar Foto");
              }
            }
          ]}
        ></IonActionSheet>

        <IonActionSheet
          isOpen={showActionSheet2}
          onDidDismiss={() => setShowActionSheet2(false)}
          buttons={[
            {
              text: "Adicionar novo look",
              handler: () => {
                console.log("Adicionar novo look");
              }
            }
          ]}
        ></IonActionSheet>
        <ImgsViewer
          imgs={imagesURL.map(function(image) {
            return { src: image };
          })}
          currImg={selectedImage}
          isOpen={showImageViewer}
          onClickPrev={() => setSelectedImage(selectedImage - 1)}
          onClickNext={() => setSelectedImage(selectedImage + 1)}
          onClose={() => setShowImageViewer(false)}
          customControls={[
            <button
              key="1"
              className="close_1tcvdj4"
              onClick={() => deleteImage(itensRef[selectedImage])}
            >
              <IonIcon color="light" size="large" icon={trash}></IonIcon>
            </button>
          ]}
        />
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

export default GalleryPage;
