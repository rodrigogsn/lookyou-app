import { firebaseDatabase, storage, auth } from "../utils/firebaseUtils";

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
