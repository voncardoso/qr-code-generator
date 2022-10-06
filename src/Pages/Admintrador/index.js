import { Header } from "../../components/Header";
import { Container } from "./style";
import { CheckCircle, Checks, NotePencil, Trash, QrCode } from "phosphor-react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../Config/config";
import { useContext, useEffect, useState } from "react";
import QRCodeLink from "qrcode";
import { UserContext } from "../../Context/useContext";

// qr-code
import Modal from "react-modal";
import ModalQrCode from "react-modal";
import { click } from "@testing-library/user-event/dist/click";

export function Admistrador() {
  const [money, setMoney] = useState("");
  const [type, setType] = useState("");
  const [qrCodeLink, setQrCodeLinkl] = useState("");
  const [isActiveModalQrCode, setIsActiveModalQrCode] = useState("");
  const [isActiveModal, setIsActiveModal] = useState(false);
  const { data } = useContext(UserContext);
  const [count, setCount] = useState("");
  const [numberQrCode, setNumberQrCode] = useState(0);
  const [img, setImg] = useState("");
  let count1 = 0;

  function handleOpenModal() {
    setIsActiveModal(true);
  }

  function handleCloseModal() {
    setIsActiveModal(false);
  }
  function handleOpenModalQrCode(img1, numberQrcode) {
    setIsActiveModalQrCode(true);
    setImg(img1);
    setNumberQrCode(numberQrcode);
  }

  function handleCloseModalQrCode() {
    setIsActiveModalQrCode(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let imgQrCode = "";
    count1 = data.length + 1;
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

    console.log("qr", imgQrCode);

    try {
      const docRef = await addDoc(collection(db, "tickets"), {
        money: money,
        type: type,
        count: count1.toLocaleString(),
        active: false,
        qrcode: imgQrCode,
      });

      console.log("Document written with ID: ", docRef.id);
      window.location.reload();
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
                    <ul>
                      <li
                        onClick={() => {
                          console.log("click", item.qrcode);
                          handleOpenModalQrCode(item.qrcode, item.count);
                        }}
                      >
                        <QrCode size={25} />
                      </li>
                      <li>
                        <NotePencil
                          className="notePencil"
                          size={25}
                          color={"var(--green-300)"}
                        />
                      </li>
                      <li>
                        <Trash size={25} color={"var(--red-300)"} />
                      </li>
                    </ul>
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
          <button className="buttonAdd">Cadastrar</button>
        </form>
      </Modal>

      <ModalQrCode
        isOpen={isActiveModalQrCode}
        onRequestClose={handleCloseModalQrCode}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <img src={`${img}`} alt="" />
        <a href={img} download={`qrcode_N=${numberQrCode}.png`}>
          baixar
        </a>
      </ModalQrCode>
    </>
  );
}
