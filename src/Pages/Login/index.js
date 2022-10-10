import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/useContext";
import { Container } from "./style";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import backgroungLogin from "../../assets/imagem-festa-tela-login.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setLogin(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          console.log("usuario existe");

          window.localStorage.setItem("login", true);
          navigate("/dashboard");
          setLogin(false);
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("usuario não existe");
        setError(true);
        setLogin(false);
      });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {error ? <div className="error">Email ou senha está inválido</div> : ""}
        <h1>Login</h1>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {login ? (
          <button disabled style={{ background: "#70B6F2" }}>
            Entrando...
          </button>
        ) : (
          <button>Login</button>
        )}
      </form>
      <div className="containerImg">
        <img src={backgroungLogin} alt="" />
      </div>
    </Container>
  );
}
