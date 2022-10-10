import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/useContext";
import { Container } from "./style";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import backgroungLogin from "../../assets/imagem-festa-tela-login.png";
import { Eye, EyeSlash } from "phosphor-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(null);
  const [error, setError] = useState(null);
  const [isTypePassword, setIsTypePassword] = useState(false);
  let textPassword = "password";
  if (isTypePassword === true) {
    textPassword = "text";
  }

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
          window.localStorage.setItem("login", true);
          navigate("/dashboard");
          setLogin(false);
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
            type={textPassword}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isTypePassword ? (
            <Eye
              className="iconViewPasswor"
              size={24}
              onClick={() => {
                setIsTypePassword(false);
              }}
            />
          ) : (
            <EyeSlash
              size={24}
              className="iconViewPasswor"
              onClick={() => {
                setIsTypePassword(true);
              }}
            />
          )}
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
