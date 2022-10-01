import { Link, useNavigate } from "react-router-dom";
import { Container } from "./style";
import { getAuth, signOut } from "firebase/auth";
import { SignOut, List } from "phosphor-react";
import styled from "styled-components";
import { getElementError } from "@testing-library/react";

export function Header() {
  const navigate = useNavigate();
  function Logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.localStorage.removeItem("login");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }


  return (
    <Container>
      <nav>
        <h1></h1>
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/administrador">Administrador</Link>
          <button onClick={Logout}>
            <p>Sair</p>
            <SignOut size={20} />
          </button>
        </div>
        <a href="#" className="menu-mobile">
            <List size={32} />
        </a>
      </nav>
    </Container>
  );
}
