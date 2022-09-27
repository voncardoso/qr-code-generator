import { Header } from "../../components/Header";
import { Container } from "./style";
import { CheckCircle, Checks, NotePencil, Trash } from "phosphor-react";

export function Admistrador() {
  return (
    <>
      <Header />
      <Container>
        <header>
          <ul>
            <li>
              <div>
                <span>Vendidos</span>
                <CheckCircle size={25} color={"var(--green-300)"} />
              </div>
              <strong>200</strong>
            </li>
            <li>
              <div>
                <span>Usados</span>
                <Checks size={25} color={"var(--blue-300)"} />
              </div>
              <strong>190</strong>
            </li>
            <li>
              <div>
                <span>Valor Total</span>
              </div>
              <strong>R$ 16.114,00</strong>
            </li>
          </ul>
        </header>

        <table>
          <thead>
            <tr>
              <th className="primeryTD">Nº </th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>233</td>
              <td>20.00 R$</td>
              <td>Area Vip</td>
              <td >
              <NotePencil className="notePencil" size={25} color={"var(--green-300)"} />
              <Trash size={25} color={"var(--red-300)"} />
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
}
