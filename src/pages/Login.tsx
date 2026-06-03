import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authService";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await login(email, password);
      navigate("/tasks");
    } catch {
      alert("No se pudo iniciar sesión. Revisa el correo y la contraseña.");
    }
  }

  return (
    <main className="center-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <p>Accede a tu cuenta para gestionar tus tareas</p>

        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="tuemail@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">→ Ingresar</button>

        

        <span className="small">
          ¿Sin cuenta? <Link to="/register">Crea una</Link>
        </span>
      </form>
    </main>
  );
}