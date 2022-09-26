import { createContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};
