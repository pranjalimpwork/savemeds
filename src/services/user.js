import { db } from "./firebase";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";

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

  // Later ...

  // Stop listening to changes
  //   unsubscribe();
};

//
