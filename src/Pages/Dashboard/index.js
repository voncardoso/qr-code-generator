import { Header } from "../../components/Header";
import { Container, Mobali } from "./style";
import {
  CheckCircle,
  XCircle,
  CaretDoubleRight,
  CaretDoubleLeft,
  Barcode,
} from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/useContext";
import { db } from "../../Config/config";
import { doc, updateDoc } from "firebase/firestore";
import { LoadingAnimacao } from "../../components/Loadign/loading";
import { Pagination } from "@mui/material";

export function Dashboard() {
  const { data, setModify, loadingAnimaçao } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [filteredRoad, setFilteredRoad] = useState([]);
  let data1 = [];
  // numero de item por pagina
  const [itensPerPage, setItensPerPage] = useState(10);
  // escolher qual pagina
  const [currentPage, setCurrentPerPage] = useState(0);
  const [loading, setLoading] = useState(false);

  if (data) {
    data.map((rodovia) => {
      data1.push(rodovia);
    });
  }

  // verificar o numero de paginas
  const pages = Math.ceil(data1.length / itensPerPage);
  // fatia o array de itens
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;

  // fatia o inicio ao final
  const currentItens = data1.slice(startIndex, endIndex);

  async function verifyTickets(id) {
    const washingtonRef = doc(db, "tickets", id);
    try {
      await updateDoc(washingtonRef, {
        active: true,
      });

      setModify(true);
      setLoading(false);
      //  window.location.reload();
    } catch {}
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

  function usedTickets() {
    let useed = 0;
    data.map((item) => {
      if (item.active === true) {
        useed++;
      }
    });

    return useed;
  }

  function notUsedTickets() {
    let notUsed = 0;

    data.map((item) => {
      if (item.active === false) {
        notUsed++;
      }
    });

    return notUsed;
  }

  const handleChangePage = (e, newPage) => {
    setCurrentPerPage(newPage - 1);

    console.log(e, newPage);
  };

  return (
    <>
      {loadingAnimaçao ? (
        <LoadingAnimacao />
      ) : (
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
                  <strong>{usedTickets()}</strong>
                </li>
                <li>
                  <div>
                    <span>Restantes</span>
                    <XCircle size={25} color={"var(--red-300)"} />
                  </div>
                  <strong>{notUsedTickets()}</strong>
                </li>
                <li>
                  <div>
                    <span>Total de Ingressos</span>
                  </div>
                  <strong>{data.length}</strong>
                </li>
              </ul>
            </header>

            <span className="inputHerader">
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
                          <td>
                            {Number(item.money).toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
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
                  : currentItens.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.count}</td>
                          <td>
                            {Number(item.money).toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
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
                                  setLoading(true);
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
              <Pagination
                className="paginacao"
                count={pages}
                color="primary"
                showFirstButton
                showLastButton
                onChange={handleChangePage}
              />
            )}
          </Container>
          <Mobali>
            {search.length > 0
              ? filteredRoad.map((item) => {
                  return (
                    <ul>
                      <li>
                        Nº: <p>{item.count}</p>
                      </li>
                      <li>
                        Valor:{" "}
                        <p>
                          {Number(item.money).toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </li>
                      <li>
                        Tipo: <p>{item.type}</p>
                      </li>
                      <li>
                        {item.active ? (
                          <button
                            style={{
                              background: "#78BAAE",
                              color: "#fff",
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
                      </li>
                    </ul>
                  );
                })
              : currentItens.map((item) => {
                  return (
                    <ul>
                      <li>
                        Nº: <p>{item.count}</p>
                      </li>
                      <li>
                        Valor:{" "}
                        <p>
                          {Number(item.money).toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </li>
                      <li>
                        Tipo: <p>{item.type}</p>
                      </li>
                      <li>
                        {item.active ? (
                          <button
                            style={{
                              background: "#78BAAE",
                              color: "#fff",
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
                      </li>
                    </ul>
                  );
                })}
            {search > 0 ? (
              ""
            ) : (
              <Pagination
                className="paginacaoMobile"
                count={pages}
                color="primary"
                hidePrevButton
                hideNextButton
                onChange={handleChangePage}
              />
            )}
          </Mobali>
        </>
      )}
    </>
  );
}
