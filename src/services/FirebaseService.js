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

  static getImagesStore = () => {};
}
