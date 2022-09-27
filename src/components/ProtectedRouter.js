import { Navigate } from "react-router-dom";

export function ProtectedRouter({ children }) {
  const login = window.localStorage.getItem("login");
  return login ? children : <Navigate to="/" />;
}
