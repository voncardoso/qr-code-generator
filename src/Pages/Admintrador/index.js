import { Header } from "../../components/Header";
import { Container } from "./style";
import { CheckCircle, Checks, NotePencil, Trash, QrCode } from "phosphor-react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
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
  const [isActiveModalQrCode, setIsActiveModalQrCode] = useState("");
  const [isActiveModal, setIsActiveModal] = useState(false);
  const { data, setModify } = useContext(UserContext);
  const [numberQrCode, setNumberQrCode] = useState(0);
  const [img, setImg] = useState("");
  const [amountBatch, setAmountBatch] = useState(0);
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

    if (data.length === 0) {
      count1 = 1;
    }
    if (data.length > 0) {
      data.map((item, index) => {
        count1 = +item.count + 1;
      });
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
        qrcode: imgQrCode,
      });

      console.log("Document written with ID: ", docRef.id);
      setModify(true);
      setMoney("");
      setType("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function handleSubmitBatch(event) {
    event.preventDefault();
    console.log("lote");
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
      console.log(count1);
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
          qrcode: imgQrCode,
        });

        console.log("Document written with ID: ", docRef.id);
        setModify(true);
        setMoney("");
        setType("");
        console.log("lote1");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  async function deleteTicktes(id) {
    let response = window.confirm("Certeza que deseja excluir o item ?");

    if (response === true) {
      await deleteDoc(doc(db, "tickets", id));
      setModify(true);
    }
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
      </Container>

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
          <button type="" className="buttonAdd" onClick={handleSubmitBatch}>
            Cadastrar
          </button>
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
    </>
  );
}
