import firebase from "firebase";

import moment from "moment";
export const setTime = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};



export const formatDate=(date:Date,format:string)=>{
  return moment(date).format(format);
}
