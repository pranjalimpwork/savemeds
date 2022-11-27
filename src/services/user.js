import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

export const addUser = async (uid, data) => {
  await setDoc(doc(db, "user", uid), data);
};

export const getUsers = () => {
  const database = collection(db, "user");
  const unsubscribe = onSnapshot(collection(db, "user"), (snapData) => {
    snapData.docs.map((data) => {
      console.log("Dataa", data.data());
    });
  });
  // Stop listening to changes
  //   unsubscribe();
};
export const getUser = async (uid) => {
  const docRef = doc(db, "user", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

//
