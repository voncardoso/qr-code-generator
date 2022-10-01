import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./Context/useContext";
import { Login } from "./Pages/Login";
import "firebase/compat/storage";
import "firebase/compat/auth";
import { firebase, firebaseConfig } from "./Config/config";
import { Dashboard } from "./Pages/Dashboard";
import { ProtectedRouter } from "./components/ProtectedRouter";
import { GlobalStyle } from "./style/global";
import { Admistrador } from "./Pages/Admintrador";
import { getFirestore } from "firebase/firestore";
import { QRcode1 } from "./Pages/QRcode1";

function App() {
  firebase.initializeApp(firebaseConfig);
  getFirestore(firebase.initializeApp(firebaseConfig));
  return (
    <div className="div-global">
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
            <Route
              path="/administrador"
              element={
                <ProtectedRouter>
                  <Admistrador />
                </ProtectedRouter>
              }
            />
            <Route
              path="/qrcode"
              element={
                <ProtectedRouter>
                  <QRcode1 />
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
