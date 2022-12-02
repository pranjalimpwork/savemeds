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

export const getAllMedicine = (setAddedData) => {
  const unsubscribe = onSnapshot(database, (snapData) => {
    let dataArr = [];
    snapData.docs.map((data, ind) => {
      dataArr = [...dataArr, data.data()];
    });
    setAddedData(dataArr);
  });
  // Stop listening to changes
  return unsubscribe;
};

export const getUserAddedMedicine = async (uid, setAddedData) => {
  const q = query(database, where("userId", "==", uid));
  const unsubscribe = onSnapshot(q, (snapData) => {
    let reqData = [];
    snapData.forEach((doc) => {
      reqData.push(doc.data());
    });
    setAddedData(reqData);
  });
};
