import { firebaseDatabase, storage, auth } from "../utils/firebaseUtils";

import api from "./api";

export default class FirebaseService {
  static getDataList = (nodePath, callback, size = 10) => {
    let query = firebaseDatabase.ref(nodePath).limitToLast(size);
    query.on("value", dataSnapshot => {
      let items = [];
      dataSnapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item["key"] = childSnapshot.key;
        items.push(item);
      });
      callback(items);
    });

    return query;
  };

  // ---------------------------------------------------------------------------
  // ---------------------------- COMMON FUNCTIONS -----------------------------
  // ---------------------------------------------------------------------------

  static generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  // ---------------------------------------------------------------------------
  // -------------------------- FIREBASE FUNCTIONS -----------------------------
  // ---------------------------------------------------------------------------

  static getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user.uid);
      }, reject);
    });
  }

  static loginUser = (email, password, login_sucess_func, login_error_func) => {
    console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        login_sucess_func(firebaseUser);
      })
      .catch(function(error) {
        login_error_func(error);
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ...
      });
  };

  static uploadImage = async (selectedPhoto, onSucess, onFail) => {
    const uuid = this.generateUUID();
    const user = await this.getCurrentUser(auth);

    const uploadPhoto = await fetch(selectedPhoto).then(r => r.blob());

    if (uploadPhoto && user) {
      storage
        .ref()
        .child(`images/${user}/${uuid}.png`)
        .put(uploadPhoto)
        .then(async res => {
          const url_response = await res.ref.getDownloadURL().then(url => url);
          const data = {
            user_id: user,
            name: `${uuid}.png`,
            favorite: 0,
            url: url_response
          };

          try {
            await api.post("/images", data);
            onSucess(res);
          } catch (_err) {
            onFail(_err);
          }
        })
        .catch(err => onFail(err));
    }
  };

  static getImagesStore = async (onSucess, onFail) => {
    const user = await this.getCurrentUser(auth);

    if (user) {
      storage
        .ref()
        .child(`images/${user}`)
        .listAll()
        .then(res => onSucess(res))
        .catch(err => onFail(err));
    }
  };

  static removeImage = async (image, onSucess, onFail) => {
    const user = await this.getCurrentUser(auth);
    const image_name = image.name.replace(/\.[^/.]+$/, "");

    if (user) {
      storage
        .ref()
        .child(`images/${user}/${image.name}`)
        .delete()
        .then(res => {
          firebaseDatabase
            .collection("/images/")
            .doc(image_name)
            .delete()
            .then(
              res => onSucess(res),
              err => onFail(err)
            );
        })
        .catch(err => onFail(err));
    }
  };

  static listLooks = async (onSucess, onFail) => {
    const user = await this.getCurrentUser(auth);

    if (user) {
      firebaseDatabase
        .collection("looks")
        .where("user_id", "==", user)
        .get()
        .then(res => {
          let data = [];

          res.forEach(doc => {
            data.push(doc.data());
          });
          onSucess(data);
        })
        .catch(err => onFail(err));
    }
  };
}
