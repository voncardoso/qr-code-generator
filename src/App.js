import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./Context/useContext";
import { Login } from "./Pages/Login";
import { firebase, firebaseConfig } from "./Config/config";
import "firebase/compat/storage";
import "firebase/compat/auth";

function App() {
  return (
    <div>
      {" "}
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route end path="/" element={<Login />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
