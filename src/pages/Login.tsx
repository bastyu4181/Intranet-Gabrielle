import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const exito = login(email, password);
    if (exito) {
      navigate("/dashboard");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  }

  return (
    <div>
      <h1>Gabrielle Studio — Panel de Gestión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}