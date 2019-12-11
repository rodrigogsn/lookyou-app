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
  IonLoading,
  IonAlert
} from "@ionic/react";

import "./Gallery.scss";

import FirebaseService from "../services/FirebaseService";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FirebaseImageActions from "../store/ducks/firebaseImages";

import ImgsViewer from "react-images-viewer";

import { add, heart, more, trash, create } from "ionicons/icons";

import store from "../store";

const { Camera } = Plugins;

const changeView = (newView, setView) => {
  setView(newView);
};

const GalleryPage = props => {
  const [view, setView] = useState("pictures");
  const [itensRef, setItensRef] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [picture, setPicture] = useState([]);
  const [looks, setLooks] = useState([]);

  const [addlookAlert, setAddlookAlert] = useState(false);
  const [alterLookNameAlert, setAlterLookNameAlert] = useState({
    visible: false,
    ref: null
  });

  const [loading, setLoading] = useState({
    show: false,
    message: "Carregando..."
  });

  const [selectedImage, setSelectedImage] = useState(0);

  const [showImageViewer, setShowImageViewer] = useState(false);

  const forceUpdate = React.useState()[1].bind(null, {});

  const fetchImages = async (showLoading = true) => {
    if (showLoading) {
      setLoading({ show: true, message: "Carregando imagens..." });
    }
    const { listImages } = props;

    listImages(
      async images => {
        const state_images = store.getState().firebaseImages;
        setItensRef(state_images.images);

        setImagesURL(state_images.imagesURL);

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

  const deleteLook = async look => {
    if (window.confirm(`Deseja deletar o look ${look.name}`)) {
      setLoading({ show: true, message: "Deletando look..." });
      FirebaseService.removeLook(
        look,
        async look => {
          const temnpLooks = looks.filter(value => {
            return value.id !== look.id;
          });

          setLooks(temnpLooks);

          setLoading({ show: false, message: "Deletando look..." });
        },
        error => {
          setLoading({ show: false, message: "Deletando look..." });
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
    const color = item.favorite ? "red" : "medium";
    return (
      <IonCard key={i}>
        <IonItem lines="none">
          <IonButton
            color={color}
            strong="true"
            size="large"
            slot="end"
            fill="clear"
            onClick={() => {
              let data = {
                favorite: item.favorite === 0 ? 1 : 0,
                id: item.id,
                name: item.name
              };

              FirebaseService.alterLook(
                data,
                async retLook => {
                  const foundIndex = looks.findIndex(x => x.id === retLook.id);
                  let temnpLooks = looks;
                  temnpLooks[foundIndex] = retLook;

                  setLooks(temnpLooks);
                  forceUpdate();
                },
                error => {
                  console.log(error);
                }
              );
            }}
          >
            <IonIcon icon={heart}></IonIcon>
          </IonButton>
          <IonButton
            color="medium"
            strong="true"
            size="large"
            slot="end"
            fill="clear"
            onClick={() => {
              deleteLook(item);
            }}
          >
            <IonIcon icon={trash}></IonIcon>
          </IonButton>
          <IonButton
            color="medium"
            strong="true"
            size="large"
            slot="end"
            fill="clear"
            onClick={() => setAlterLookNameAlert({ visible: true, ref: item })}
          >
            <IonIcon icon={create}></IonIcon>
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
              {item.look_images.map(function(image, j) {
                return (
                  <div className="image-container" key={j}>
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
          <IonFabButton onClick={() => setAddlookAlert(true)}>
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

        <IonAlert
          isOpen={addlookAlert}
          onDidDismiss={() => setAddlookAlert(false)}
          header={"Novo Look!"}
          message={"Qual o nome do Look?"}
          inputs={[
            {
              name: "name",
              type: "text",
              placeholder: "Nome do Look"
            }
          ]}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "secondary",
              handler: value => {}
            },
            {
              text: "Gravar",
              handler: value => {
                setLoading({ show: true, message: "Salvando Look..." });
                FirebaseService.addLook(
                  value.name,
                  async newlook => {
                    const temnpLooks = looks;
                    temnpLooks.push(newlook);

                    setLooks(temnpLooks);
                    setLoading({ show: false, message: "Salvando Look..." });
                  },
                  error => {
                    setLoading({
                      show: false,
                      message: "Salvando Look ..."
                    });
                    console.log(error);
                  }
                );
              }
            }
          ]}
        />

        <IonAlert
          isOpen={alterLookNameAlert.visible}
          onDidDismiss={() =>
            setAlterLookNameAlert({ visible: false, ref: null })
          }
          header={"Alterar Nome!"}
          message={"Qual o novo Nome do Look?"}
          inputs={[
            {
              name: "name",
              type: "text",
              placeholder: "Nome do Look"
            }
          ]}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "secondary",
              handler: value => {}
            },
            {
              text: "Alterar",
              handler: value => {
                setLoading({ show: true, message: "Alterando Nome..." });
                alterLookNameAlert.ref.name = value.name;

                FirebaseService.alterLook(
                  alterLookNameAlert.ref,
                  async retLook => {
                    const foundIndex = looks.findIndex(
                      x => x.id === retLook.id
                    );
                    let temnpLooks = looks;
                    temnpLooks[foundIndex] = retLook;

                    setLooks(temnpLooks);

                    setLoading({ show: false, message: "Alterando Nome..." });
                  },
                  error => {
                    setLoading({
                      show: false,
                      message: "Alterando Nome ..."
                    });
                    console.log(error);
                  }
                );
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(FirebaseImageActions, dispatch);

export default connect(null, mapDispatchToProps)(GalleryPage);
