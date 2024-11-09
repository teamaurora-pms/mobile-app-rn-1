import { getDatabase } from 'firebase/database';
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyDyo_659Qfh9f27AYXCJGqDu4ngPD6Mqko",
  authDomain: "iot-firebase-07.firebaseapp.com",
  databaseURL: "https://iot-firebase-07-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "iot-firebase-07",
  storageBucket: "iot-firebase-07.appspot.com",
  messagingSenderId: "443508707768",
  appId: "1:443508707768:web:67424dc8fb5fab42677f4d"

}


if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

export const rdb= getDatabase();