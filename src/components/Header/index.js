import { Link } from "react-router-dom";
import { Container } from "./style";

export function Header() {
  return (
    <Container>
      <nav>
        <Link to="#">Dashboard</Link>
        <Link to="#">Administrador</Link>
      </nav>
    </Container>
  );
}
