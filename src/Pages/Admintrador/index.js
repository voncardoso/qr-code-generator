import { Header } from "../../components/Header";
import { Container, Mobali } from "./style";
import {
  CheckCircle,
  Checks,
  NotePencil,
  Trash,
  QrCode,
  CaretDoubleRight,
  CaretDoubleLeft,
  Plus,
  Check,
} from "phosphor-react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config/config";
import { useContext, useEffect, useState } from "react";
import QRCodeLink from "qrcode";
import { UserContext } from "../../Context/useContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// qr-code
import Modal from "react-modal";
import ModalQrCode from "react-modal";
import ModalUpdate from "react-modal";
import ModalUpdateConrfirmLote from "react-modal";
import { LoadingAnimacao } from "../../components/Loadign/loading";

export function Admistrador() {
  const [money, setMoney] = useState("");
  const [type, setType] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [moneyUpdate, setMoneyUpdate] = useState("");
  const [typeUpdate, setTypeUpdate] = useState("");
  const [isActiveUpdate, setIsActiveUpdate] = useState(false);
  const [itemId, setItemId] = useState("");
  const [ticktisInit, setTicktisInit] = useState(0);
  const [ticktisFinal, setTicktisFinal] = useState(0);
  const [ticktisIsActive, setTicktisIsActive] = useState(false);

  const [isActiveModalQrCode, setIsActiveModalQrCode] = useState("");
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveModalConfirmLote, setIsActiveModalConfirmLote] =
    useState(false);
  const [isActiveModalUpdate, setIsActiveModalUpdate] = useState(false);
  const { data, setModify, loadingAnimaçao } = useContext(UserContext);
  const [numberQrCode, setNumberQrCode] = useState(0);
  const [img, setImg] = useState("");
  const [amountBatch, setAmountBatch] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredRoad, setFilteredRoad] = useState([]);
  let data1 = [];
  // numero de item por pagina
  const [itensPerPage, setItensPerPage] = useState(10);
  // escolher qual pagina
  const [currentPage, setCurrentPerPage] = useState(0);
  const [arry, setArry] = useState([]);

  let count1 = 0;

  function handleOpenModal() {
    setIsActiveModal(true);
  }

  function handleCloseModal() {
    setIsActiveModal(false);
  }

  function handleOpenModalConfirmLote() {
    setIsActiveModalConfirmLote(true);
  }

  function handleCloseModalConfirmLote() {
    setIsActiveModalConfirmLote(false);
  }

  function handleOpenModalQrCode(img1, numberQrcode) {
    setIsActiveModalQrCode(true);
    setImg(img1);
    setNumberQrCode(numberQrcode);
  }

  function handleCloseModalQrCode() {
    setIsActiveModalQrCode(false);
  }

  function handleOpenModalUpdate() {
    setIsActiveModalUpdate(true);
  }

  function handleCloseModalUpdate() {
    setIsActiveModalUpdate(false);
  }

  async function handleSubmitBatch(event) {
    event.preventDefault();
    setIsActive(true);
    if (data.length === 0) {
      count1 = 1;
    }
    if (data.length > 0) {
      await data.map((item, index) => {
        count1 = +item.count + 1;
      });
    }
    for (let i = 1; i <= amountBatch; i++) {
      let imgQrCode = "";
      if (i > 1) {
        count1 = count1 + 1;
      }
      let countString = count1.toString();

      QRCodeLink.toDataURL(
        countString,
        {
          width: 400,
          margin: 3,
        },
        function (err, url) {
          imgQrCode = url;
        }
      );

      try {
        const docRef = await addDoc(collection(db, "tickets"), {
          money: money,
          type: type,
          count: +count1,
          active: false,
          //  qrcode: imgQrCode,
        });

        setMoney("");
        setType("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    setModify(true);
    setIsActive(false);
    handleCloseModal();
  }

  function geradorQRCODE(count) {
    console.log("gerador", count);
    let imgQrCode = "";
    let countString = count.toString();

    QRCodeLink.toDataURL(
      countString,
      {
        width: 400,
        margin: 3,
      },
      function (err, url) {
        imgQrCode = url;
      }
    );

    handleOpenModalQrCode(imgQrCode, count);
  }

  async function deleteTicktes(id) {
    let response = window.confirm("Certeza que deseja excluir o item ?");

    if (response === true) {
      await deleteDoc(doc(db, "tickets", id));
      setModify(true);
    }
  }

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

  function valueTotal() {
    let money = [];
    data.map((item) => {
      money.push(+item.money);
    });
    const total = money.reduce((acc, item) => {
      return Number(acc) + item;
    }, 0);

    return total.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  function usedTickets() {
    let useed = 0;

    data.map((item) => {
      if (item.active === true) {
        useed++;
      }
    });

    return useed;
  }

  async function UpdateInformation(item) {
    setArry(item);
    setMoneyUpdate(item.money);
    setTypeUpdate(item.type);
    setIsActiveUpdate(item.active);
    setItemId(item.id);
  }

  async function Update(event) {
    event.preventDefault();
    let ativo = false;

    if (isActiveUpdate === "true") {
      ativo = true;
    } else {
      ativo = false;
    }
    const washingtonRef = doc(db, "tickets", itemId);

    await updateDoc(washingtonRef, {
      active: ativo,
      money: moneyUpdate,
      type: typeUpdate,
    });
    setModify(true);
    handleCloseModalUpdate();
  }

  async function ConfimLtote(event) {
    event.preventDefault();
    let inicicial = +ticktisInit - 1;
    let final = +ticktisFinal;
    const lote = data.slice(inicicial, final);
    console.log(lote, inicicial, final);
    let ativo = false;

    lote.map((item) => {
      if (ticktisIsActive === "true") {
        ativo = true;
      } else {
        ativo = false;
      }
      const washingtonRef = doc(db, "tickets", item.id);

      updateDoc(washingtonRef, {
        active: ativo,
      });

      console.log("foi");
    });

    setModify(true);
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
                    <span>Vendidos</span>
                    <CheckCircle size={25} color={"var(--green-300)"} />
                  </div>
                  <strong>{data.length}</strong>
                </li>
                <li>
                  <div>
                    <span>Usados</span>
                    <Checks size={25} color={"var(--blue-300)"} />
                  </div>
                  <strong>{usedTickets()}</strong>
                </li>
                <li>
                  <div>
                    <span>Valor Total</span>
                  </div>
                  <strong>{valueTotal()}</strong>
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
              <group>
                <button className="buttonAdd" onClick={handleOpenModal}>
                  Adicionar
                </button>

                <button
                  className="buttonAdd"
                  onClick={handleOpenModalConfirmLote}
                >
                  <Check size={18} /> <p>Lote</p>
                </button>
              </group>
            </span>
            <table>
              <thead>
                <tr>
                  <th className="primeryTD">Nº </th>
                  <th>Valor</th>
                  <th>Tipo</th>
                  <th>Status</th>
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
                              <p style={{ color: "var(--green-300)" }}>
                                Confirmado
                              </p>
                            ) : (
                              <p style={{ color: "#F5C61C" }}>Pendente</p>
                            )}
                          </td>
                          <td>
                            <ul>
                              <li
                                onClick={() => {
                                  console.log("click");
                                  geradorQRCODE(item.count);
                                }}
                              >
                                <QrCode size={25} />
                              </li>

                              <li
                                onClick={() => {
                                  handleOpenModalUpdate();
                                  UpdateInformation(item);
                                }}
                              >
                                <NotePencil
                                  className="notePencil"
                                  size={25}
                                  color={"var(--blue-400)"}
                                />
                              </li>

                              <li
                                onClick={() => {
                                  deleteTicktes(item.id);
                                }}
                              >
                                <Trash size={25} color={"var(--red-300)"} />
                              </li>
                            </ul>
                          </td>
                        </tr>
                      );
                    })
                  : currentItens.map((item) => {
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
                              <p style={{ color: "var(--green-300)" }}>
                                Confirmado
                              </p>
                            ) : (
                              <p style={{ color: "#F5C61C" }}>Pendente</p>
                            )}
                          </td>
                          <td>
                            <ul>
                              <li
                                onClick={() => {
                                  console.log("click");
                                  geradorQRCODE(item.count);
                                }}
                              >
                                <QrCode size={25} />
                              </li>
                              <li
                                onClick={() => {
                                  handleOpenModalUpdate();
                                  UpdateInformation(item);
                                }}
                              >
                                <NotePencil
                                  className="notePencil"
                                  size={25}
                                  color={"var(--blue-400)"}
                                />
                              </li>
                              <li
                                onClick={() => {
                                  deleteTicktes(item.id);
                                }}
                              >
                                <Trash size={25} color={"var(--red-300)"} />
                              </li>
                            </ul>
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
                        {" "}
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
                      <li className="ststusLi">
                        {item.active ? (
                          <p style={{ color: "var(--green-300)" }}>
                            Confirmado
                          </p>
                        ) : (
                          <p style={{ color: "#F5C61C" }}>Pendente</p>
                        )}
                      </li>
                      <li>
                        <QrCode
                          size={25}
                          onClick={() => {
                            handleOpenModalQrCode(item.qrcode, item.count);
                          }}
                        />

                        <NotePencil
                          onClick={() => {
                            handleOpenModalUpdate();
                            UpdateInformation(item);
                          }}
                          className="notePencil"
                          size={25}
                          color={"var(--blue-300)"}
                        />

                        <Trash
                          size={25}
                          color={"var(--red-300)"}
                          onClick={() => {
                            deleteTicktes(item.id);
                          }}
                        />
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
                      <li className="ststusLi">
                        {item.active ? (
                          <p style={{ color: "var(--green-300)" }}>
                            Confirmado
                          </p>
                        ) : (
                          <p style={{ color: "#F5C61C" }}>Pendente</p>
                        )}
                      </li>
                      <li>
                        <QrCode
                          size={25}
                          color={"#000"}
                          onClick={() => {
                            handleOpenModalQrCode(item.qrcode, item.count);
                          }}
                        />

                        <NotePencil
                          onClick={() => {
                            handleOpenModalUpdate();
                            UpdateInformation(item);
                          }}
                          className="notePencil"
                          size={25}
                          color={"var(--blue-300)"}
                        />

                        <Trash
                          size={25}
                          color={"var(--red-300)"}
                          onClick={() => {
                            deleteTicktes(item.id);
                          }}
                        />
                      </li>
                    </ul>
                  );
                })}

            {/**paginaçao */}
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

          <Modal
            isOpen={isActiveModal}
            onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
          >
            <form onSubmit={handleSubmitBatch}>
              <h3>Cadastro de ingresso</h3>
              <label htmlFor="">Valor</label>
              <input
                required
                type="text"
                value={money}
                onChange={(event) => setMoney(event.target.value)}
              />
              <label className="nucleRegional" htmlFor="">
                Tipo do ingresso
                <select
                  name="uf"
                  id="uf"
                  required
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="">Ingresso</option>
                  <option value="Pista">Pista</option>
                  <option value="Área Vip">Área Vip</option>
                  <option value="Camarote">Camarote</option>
                </select>
              </label>

              <label htmlFor="">Quantidade de Ingresso</label>
              <input
                required
                type="text"
                value={amountBatch}
                onChange={(event) => setAmountBatch(event.target.value)}
              />
              {isActive ? (
                <button
                  disabled
                  type=""
                  className="buttonAdd"
                  onClick={handleSubmitBatch}
                >
                  Cadastrando...
                </button>
              ) : (
                <button
                  type=""
                  className="buttonAdd"
                  onClick={handleSubmitBatch}
                >
                  Cadastrar
                </button>
              )}
            </form>
          </Modal>

          <ModalQrCode
            isOpen={isActiveModalQrCode}
            onRequestClose={handleCloseModalQrCode}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
          >
            <div>
              <img src={`${img}`} alt="" />
              <a href={img} download={`qrcode_N=${numberQrCode}.png`}>
                Baixar Qr Code
              </a>
            </div>
          </ModalQrCode>

          <ModalUpdate
            isOpen={isActiveModalUpdate}
            onRequestClose={handleCloseModalUpdate}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
          >
            <form onSubmit={Update}>
              <h3>Atualizar ingresso</h3>
              <label htmlFor="">Valor</label>
              <input
                required
                type="text"
                value={moneyUpdate}
                onChange={(event) => setMoneyUpdate(event.target.value)}
              />
              <label className="nucleRegional" htmlFor="">
                Tipo do ingresso
                <select
                  name="uf"
                  id="uf"
                  required
                  value={typeUpdate}
                  onChange={(event) => setTypeUpdate(event.target.value)}
                >
                  <option value="">Ingresso</option>
                  <option value="Pista">Pista</option>
                  <option value="Área Vip">Área Vip</option>
                  <option value="Camarote">Camarote</option>
                </select>
              </label>

              <label className="nucleRegional" htmlFor="">
                Status
                <select
                  name="uf"
                  id="uf"
                  type="bolean"
                  value={isActiveUpdate}
                  onChange={(event) => setIsActiveUpdate(event.target.value)}
                >
                  <option value="">Status</option>
                  <option value={true}>Confirmado</option>
                  <option value={false}>Pendente</option>
                </select>
              </label>
              <button type="" className="buttonAdd">
                Atualizar
              </button>
            </form>
          </ModalUpdate>

          <ModalUpdateConrfirmLote
            isOpen={isActiveModalConfirmLote}
            onRequestClose={handleCloseModalConfirmLote}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
          >
            <form onSubmit={ConfimLtote}>
              <h3>Confirma ingresso em lote</h3>
              <label htmlFor=""> Nº Ingresso Inicial</label>
              <input
                required
                type="number"
                value={ticktisInit}
                onChange={(event) => setTicktisInit(event.target.value)}
              />

              <label htmlFor=""> Nº Ingresso final</label>
              <input
                required
                type="number"
                value={ticktisFinal}
                onChange={(event) => setTicktisFinal(event.target.value)}
              />

              <label className="nucleRegional" htmlFor="">
                Status
                <select
                  name="uf"
                  id="uf"
                  type="bolean"
                  value={ticktisIsActive}
                  onChange={(event) => setTicktisIsActive(event.target.value)}
                >
                  <option value="">Status</option>
                  <option value={true}>Confirmado</option>
                  <option value={false}>Pendente</option>
                </select>
              </label>

              <button type="" className="buttonAdd">
                Confirmar
              </button>
            </form>
          </ModalUpdateConrfirmLote>
        </>
      )}
    </>
  );
}
