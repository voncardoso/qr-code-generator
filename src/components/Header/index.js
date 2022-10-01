import { Link, useNavigate } from "react-router-dom";
import { Container } from "./style";
import { getAuth, signOut } from "firebase/auth";
import { SignOut } from "phosphor-react";

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
      </nav>
    </Container>
  );
}
