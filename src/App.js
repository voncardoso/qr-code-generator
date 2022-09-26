import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./Context/useContext";
import { Login } from "./Pages/Login";
import "firebase/compat/storage";
import "firebase/compat/auth";
import { firebase, firebaseConfig } from "./Config/config";
import { Dashboard } from "./Pages/Dashboard";

function App() {
  firebase.initializeApp(firebaseConfig);
  return (
    <div>
      {" "}
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route end path="/" element={<Login />} />
            <Route end path="/dashboard" element={<Dashboard />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
