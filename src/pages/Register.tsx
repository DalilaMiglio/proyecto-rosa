import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../features/auth/authService";

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await register(email, password);
      navigate("/tasks");
    } catch {
      alert("No se pudo registrar el usuario.");
    }
  }

  return (
    <main className="center-page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        <p>Crea tu cuenta para comenzar a organizar tus tareas</p>

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
          placeholder="mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <button>Crear cuenta</button>

        <span className="small">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </span>
      </form>
    </main>
  );
}