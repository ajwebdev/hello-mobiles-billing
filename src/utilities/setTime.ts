import firebase from "firebase";
export const setTime = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};
