import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./Context/useContext";
import { Login } from "./Pages/Login";
import "firebase/compat/storage";
import "firebase/compat/auth";
import { firebase, firebaseConfig } from "./Config/config";
import { Dashboard } from "./Pages/Dashboard";
import { ProtectedRouter } from "./components/ProtectedRouter";
import { GlobalStyle } from "./style/global";

function App() {
  firebase.initializeApp(firebaseConfig);
  return (
    <div>
      {" "}
      <BrowserRouter>
        <GlobalStyle />
        <UserStorage>
          <Routes>
            <Route end path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRouter>
                  <Dashboard />
                </ProtectedRouter>
              }
            />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
