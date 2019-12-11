import { createReducer, createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  listImages: ["onSuccess", "onError"],
  listImagesSuccess: ["images"]
});

export const firebaseImagesTypes = Types;
export default Creators;

const INITIAL_STATE = {
  images: {},
  imagesURL: {}
};

export const getImages = (state, { images }) => {
  var urls = images.map(function(item) {
    return item.url;
  });

  const newState = { images: images, imagesURL: urls };
  return (state = newState);
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_IMAGES_SUCCESS]: getImages
});
