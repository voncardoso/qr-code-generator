import { Header } from "../../components/Header";
import { Container } from "./style";
import { CheckCircle, XCircle } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/useContext";
import { db } from "../../Config/config";
import { doc, updateDoc } from "firebase/firestore";

export function Dashboard() {
  const { data } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [filteredRoad, setFilteredRoad] = useState([]);

  async function verifyTickets(id) {
    const washingtonRef = doc(db, "tickets", id);
    console.log("foi-------------------");
    try {
      await updateDoc(washingtonRef, {
        active: true,
      });

      window.location.reload();
    } catch {
      console.log("erro");
    }
  }

  // filtro de pesdquisa
  useEffect(() => {
    if (data) {
      setFilteredRoad(
        data.filter((item) => item.count.includes(search.toLocaleUpperCase()))
      );
    }
  }, [search]);

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

        <span>
          <input
            type="search"
            placeholder="Buscar Ingresso"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <a href="/qrcode">Qr-code</a>
        </span>

        <table>
          <thead>
            <tr>
              <th className="primeryTD">Nº </th>
              <th>Valor</th>
              <th>Tipo</th>
              <th className="acoes">Ações</th>
            </tr>
          </thead>

          <tbody>
            {search.length > 0
              ? filteredRoad.map((item) => {
                  return (
                    <tr>
                      <td>{item.count}</td>
                      <td>{item.money}</td>
                      <td>{item.type}</td>
                      <td>
                        {item.active ? (
                          <button
                            style={{
                              background: "transparent",
                              color: "#78BAAE",
                              fontSize: "1rem",
                            }}
                          >
                            Verificado
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              verifyTickets(item.id);
                            }}
                          >
                            Confirmar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              : data.map((item) => {
                  return (
                    <tr>
                      <td>{item.count}</td>
                      <td>{item.money}</td>
                      <td>{item.type}</td>
                      <td>
                        {item.active ? (
                          <button
                            style={{
                              background: "transparent",
                              color: "#78BAAE",
                              fontSize: "1rem",
                            }}
                          >
                            Verificado
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              verifyTickets(item.id);
                            }}
                          >
                            Confirmar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </Container>
    </>
  );
}
