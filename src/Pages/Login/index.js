import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/useContext";
import { Container } from "./style";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import backgroungLogin from "../../assets/imagem-festa-tela-login.png"

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    console.log("clicl");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          console.log("usuario existe");
          navigate("/Dashboard");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("usuario não existe");
      });
  }

  console.log("emial", email);
  console.log("password", password);
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Login</button>
      </form>
      <div>
        <img src={backgroungLogin} alt="" />
      </div>
      
    </Container>
  );
}
