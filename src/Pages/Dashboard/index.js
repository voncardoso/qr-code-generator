import { Header } from "../../components/Header";
import { Container } from "./style";
import {
  CheckCircle,
  XCircle,
  Checks,
  NotePencil,
  Trash,
  QrCode,
  CaretDoubleRight,
  CaretDoubleLeft,
} from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/useContext";
import { db } from "../../Config/config";
import { doc, updateDoc } from "firebase/firestore";

export function Dashboard() {
  const { data, setModify } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [filteredRoad, setFilteredRoad] = useState([]);
  let data1 = [];
  // numero de item por pagina
  const [itensPerPage, setItensPerPage] = useState(10);
  // escolher qual pagina
  const [currentPage, setCurrentPerPage] = useState(0);

  if (data) {
    data.map((rodovia) => {
      data1.push(rodovia);
    });
  }

  console.log(data1.length);
  // verificar o numero de paginas
  const pages = Math.ceil(data1.length / itensPerPage);
  // fatia o array de itens
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;

  // fatia o inicio ao final
  const currentItens = data1.slice(startIndex, endIndex);

  async function verifyTickets(id) {
    const washingtonRef = doc(db, "tickets", id);
    console.log("foi-------------------");
    try {
      await updateDoc(washingtonRef, {
        active: true,
      });

      setModify(true);
      //  window.location.reload();
    } catch {
      console.log("erro");
    }
  }

  // filtro de pesdquisa
  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setFilteredRoad(
          data.filter((item) => item.count.toString().includes(search))
        );
      }
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
              : currentItens.map((item) => {
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

        {search > 0 ? (
          ""
        ) : (
          <div className="paginacao">
            <span>
              {currentPage == 0 ? (
                <button
                  disabled
                  className="Anterior"
                  style={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <CaretDoubleLeft color=" #9baebf" size={18} />
                </button>
              ) : (
                <button
                  className="Anterior"
                  onClick={() => {
                    setCurrentPerPage(currentPage - 1);
                  }}
                >
                  <CaretDoubleLeft size={18} />
                </button>
              )}

              {Array.from(Array(pages), (item, index) => {
                return (
                  <button
                    style={
                      index == currentPage
                        ? {
                            background: "var(--blue-400)",
                            color: "var(--white)",
                          }
                        : null
                    }
                    className="paginationButton"
                    value={index}
                    onClick={(e) => setCurrentPerPage(e.target.value)}
                  >
                    {index + 1}
                  </button>
                );
              })}
              {currentPage == pages - 1 ? (
                <button disabled className="Anterior">
                  <CaretDoubleRight color=" #9baebf" size={18} />
                </button>
              ) : (
                <button
                  className="Anterior"
                  onClick={() => {
                    setCurrentPerPage(currentPage + 1);
                  }}
                >
                  <CaretDoubleRight size={18} />
                </button>
              )}
            </span>
          </div>
        )}
      </Container>
    </>
  );
}
