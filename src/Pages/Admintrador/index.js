import { Header } from "../../components/Header";
import { Container } from "./style";
import { CheckCircle, Checks, NotePencil, Trash } from "phosphor-react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../Config/config";
import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import QRCodeLink from "qrcode";
import Modal from "react-modal";
import { UserContext } from "../../Context/useContext";

export function Admistrador() {
  const [money, setMoney] = useState("");
  const [type, setType] = useState("");
  const [qrCodeLink, setQrCodeLinkl] = useState("");
  const [isActiveModal, setIsActiveModal] = useState(false);
  const { data } = useContext(UserContext);
  const [count, setCount] = useState("");

  function handleOpenModal() {
    setIsActiveModal(true);
  }

  function handleCloseModal() {
    setIsActiveModal(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let count1 = 0;
    data.map((item) => {
      if (count1 < +item.count) {
        count1 = +item.count + 1;
      }
    });
    console.log("count", count1);
    try {
      const docRef = await addDoc(collection(db, "tickets"), {
        money: money,
        type: type,
        count: count1.toLocaleString(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function DonwloadQRcode(link_url) {
    QRCodeLink.toDataURL(
      link_url,
      {
        width: 400,
        margin: 3,
      },
      function (err, url) {
        setQrCodeLinkl(url);
      }
    );
  }

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
              <strong>R$ 16</strong>
            </li>
          </ul>
        </header>

        <button className="buttonAdd" onClick={handleOpenModal}>
          Adicionar
        </button>
        <a
          onClick={() => {
            DonwloadQRcode(count);
          }}
          href={qrCodeLink}
          download={`qrcode.png`}
        >
          baixar
        </a>
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
            {data.map((item) => {
              return (
                <tr>
                  <td>{item.count}</td>
                  <td>{item.money}</td>
                  <td>{item.type}</td>
                  <td>
                    <NotePencil
                      className="notePencil"
                      size={25}
                      color={"var(--green-300)"}
                    />
                    <Trash size={25} color={"var(--red-300)"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
      <Modal
        isOpen={isActiveModal}
        onRequestClose={handleCloseModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <form onSubmit={handleSubmit}>
          <h3>Cadastro de ingresso</h3>
          <label htmlFor="">Valor</label>
          <input
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
          <QRCode value={count} />
          <button>Cadastrar</button>
        </form>
      </Modal>
    </>
  );
}
