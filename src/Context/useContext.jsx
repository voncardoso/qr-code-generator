import { createContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../Config/config";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getIngressos() {
      const querySnapshot = await getDocs(collection(db, "tickets"));
      setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getIngressos();
  }, []);
  return (
    <UserContext.Provider value={{ data }}>{children}</UserContext.Provider>
  );
};
