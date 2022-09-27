import { Link } from "react-router-dom";
import { Container } from "./style";

export function Header() {
  return (
    <Container>
      <nav>
        <h1></h1>
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/administrador">Administrador</Link>
        </div>
      </nav>
    </Container>
  );
}
