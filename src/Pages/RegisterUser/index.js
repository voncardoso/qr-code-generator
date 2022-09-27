import { useState } from "react";
import { Container } from "./style";

export function RegisterUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function hamdleSubmitRegister() {}

  return (
    <Container>
      <h1>Registrar usuario</h1>
      <form onSubmit={hamdleSubmitRegister}>
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

      <img src="" alt="" />
    </Container>
  );
}
