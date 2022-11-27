import { db } from "./firebase";
import {
  query,
  where,
  addDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

const database = collection(db, "medicineDB");

export const addMedicine = async (data) => {
  await addDoc(database, data);
};

export const getAllMedicine = () => {
  const unsubscribe = onSnapshot(database, (snapData) => {
    snapData.docs.map((data) => {
      console.log("Dataa", data.data());
    });
  });
  // Stop listening to changes
  //   unsubscribe();
};

export const getUserAddedMedicine = async (uid) => {
  const q = query(database, where("userID", "==", uid));
  const unsubscribe = onSnapshot(q, (snapData) => {
    snapData.docs.map((data) => {
      console.log("Dataa", data.data());
    });
  });
};
