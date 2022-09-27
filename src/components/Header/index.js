import { Link } from "react-router-dom";
import { Container } from "./style";

export function Header() {
  return (
    <Container>
      <nav>
        <h1></h1>
        <div>
          <Link to="#">Dashboard</Link>
          <Link to="#">Administrador</Link>
        </div>
      </nav>
    </Container>
  );
}
