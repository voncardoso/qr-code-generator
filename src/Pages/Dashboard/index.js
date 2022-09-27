import { Header } from "../../components/Header";
import { Container } from "./style";
import { CheckCircle, XCircle } from "phosphor-react";

export function Dashboard() {
  return (
    <>
      <Header />
      <Container>
        <header>
          <ul>
            <li>
              <div>
                <span>Confirmados</span>
                <CheckCircle size={25} color={"var(--green-300)"} />
              </div>
              <strong>34</strong>
            </li>
            <li>
              <div>
                <span>Restantes</span>
                <XCircle size={25} color={"var(--red-300)"} />
              </div>
              <strong>34</strong>
            </li>
            <li>
              <div>
                <span>Total de Ingressos</span>
              </div>
              <strong>34</strong>
            </li>
          </ul>
        </header>
      </Container>
    </>
  );
}
