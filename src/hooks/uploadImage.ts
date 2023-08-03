import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../infra/firebase-config";
import uuid from "react-uuid";

export const imageUpload = async (file: any) => {
  let imageUrlUploaded: any;
  const imageRef = ref(storage, `canais/${uuid()}`);
  await uploadBytes(imageRef, file).then(async (snapshot) => {
    await getDownloadURL(snapshot?.ref).then((downloadURL) => {
      imageUrlUploaded = downloadURL;
    });
  });

  return imageUrlUploaded;
};
