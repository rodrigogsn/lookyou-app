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
    return auth.signInWithEmailAndPassword(email, password);
  };

  static logoutUser = (sucess, error) => {
    return auth.signOut();
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

    try {
      const images = await api.get(`/images?user_id=${user}`);
      return images;
      // onSucess(images.data);
    } catch (_err) {
      // onFail(_err);
    }
  };

  static removeImage = async (image, onSucess, onFail) => {
    const user = await this.getCurrentUser(auth);

    if (user) {
      storage
        .ref()
        .child(`images/${user}/${image.name}`)
        .delete()
        .then(async res => {
          try {
            await api.delete(`/images/0?name=${image.name}`);
            onSucess(res);
          } catch (_err) {
            onFail(_err);
          }
        })
        .catch(err => onFail(err));
    }
  };

  static listLooks = async (onSucess, onFail) => {
    const user = await this.getCurrentUser(auth);

    try {
      const looks = await api.get(`/looks?user_id=${user}`);
      onSucess(looks.data);
    } catch (_err) {
      onFail(_err);
    }
  };

  static addLook = async (name, onSucess, onFail) => {
    const user = await this.getCurrentUser(auth);

    const data = {
      user_id: user,
      name,
      favorite: 0
    };

    try {
      const looks = await api.post(`/looks`, data);
      onSucess(looks.data);
    } catch (_err) {
      onFail(_err);
    }
  };

  static alterLook = async (look, onSucess, onFail) => {
    const user = await this.getCurrentUser(auth);

    const data = {
      name: look.name,
      favorite: look.favorite
    };

    if (user) {
      try {
        const retLook = await api.put(`/looks/${look.id}`, data);
        onSucess(retLook.data);
      } catch (_err) {
        onFail(_err);
      }
    }
  };

  static removeLook = async (look, onSucess, onFail) => {
    const user = await this.getCurrentUser(auth);

    if (user) {
      try {
        await api.delete(`/looks/${look.id}`);
        onSucess(look);
      } catch (_err) {
        onFail(_err);
      }
    }
  };
}
