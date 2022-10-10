import { db } from "../../Config/config";
import { useContext, useEffect, useState } from "react";
import {
  CheckCircle,
  Checks,
  NotePencil,
  Trash,
  QrCode,
  CaretDoubleRight,
  CaretDoubleLeft,
} from "phosphor-react";
import { Container } from "./style";
import { Header } from "../../components/Header";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Modal from "react-modal";

export function User() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isActiveModal, setIsActiveModal] = useState(false);
  const auth = getAuth();
  console.log("userteste", auth.currentUser);

  function registerUser(event) {
    event.preventDefault();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  function handleOpenModal() {
    setIsActiveModal(true);
  }

  function handleCloseModal() {
    setIsActiveModal(false);
  }
  return (
    <>
      <Header />
      <Container>
        <span className="inputHerader">
          <input type="search" placeholder="Buscar Ingresso" value="" />

          <button className="buttonAdd" onClick={handleOpenModal}>
            Adicionar
          </button>
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
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <ul>
                  <li>
                    <QrCode size={25} />
                  </li>

                  <li
                    onClick={() => {
                      console.log("click");
                    }}
                  >
                    <NotePencil
                      className="notePencil"
                      size={25}
                      color={"var(--blue-400)"}
                    />
                  </li>

                  <li>
                    <Trash size={25} color={"var(--red-300)"} />
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>

      <Modal
        isOpen={isActiveModal}
        onRequestClose={handleCloseModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <form onSubmit={registerUser}>
          <h3>Cadastrar Usuário</h3>
          <label htmlFor="">E-mail</label>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="">Senha</label>
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="" className="buttonAdd">
            Cadastrar
          </button>
        </form>
      </Modal>
    </>
  );
}
