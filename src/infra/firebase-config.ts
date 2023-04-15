import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBuAETTBXSUVq0fAmOxhFMN5fqNwcmxlnc",
  authDomain: "videozone-streaming.firebaseapp.com",
  databaseURL: "https://videozone-streaming-default-rtdb.firebaseio.com",
  projectId: "videozone-streaming",
  storageBucket: "videozone-streaming.appspot.com",
  messagingSenderId: "749809067512",
  appId: "1:749809067512:web:7071b2abb81ec0f010e20d",
  measurementId: "G-XGHN6RX7YJ"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const realtime_db = getDatabase(app);
