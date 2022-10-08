import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "./style";
import { getAuth, signOut } from "firebase/auth";
import { SignOut, List } from "phosphor-react";
import styled from "styled-components";
import { getElementError } from "@testing-library/react";
import { useEffect, useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [styleAdministrador, setStyleAdministrador] = useState(false);
  const [styleDashboard, setStyleDashboard] = useState(false);

  useEffect(() => {
    function routeStyle() {
      if (pathname === "/administrador") {
        console.log("foi");
        setStyleAdministrador(true);
      }
      if (pathname === "/dashboard") {
        console.log("foi dashboar");
        setStyleDashboard(true);
      }
    }
    routeStyle();
  }, [pathname]);

  if (pathname === "/dashboard") {
    console.log("teste");
  }

  console.log(pathname);
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
          {styleDashboard ? (
            <Link className="isActive" to="/dashboard">
              Dashboard
            </Link>
          ) : (
            <Link to="/dashboard">Dashboard</Link>
          )}
          {styleAdministrador ? (
            <Link className="isActive" to="/administrador">
              Administrador
            </Link>
          ) : (
            <Link to="/administrador">Administrador</Link>
          )}

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
