import { Link } from "react-router-dom";
import { logout } from "../features/auth/authService";

interface Props {
  email?: string | null;
}

export function Navbar({ email }: Props) {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        📋 GestorTareas
      </Link>

      <nav>
        <Link to="/about">Acerca de</Link>

        {email ? (
          <>
            <Link to="/tasks" className="active-link">Mis Tareas</Link>
            <span className="email">{email}</span>
            <button onClick={logout} className="nav-button outline-button">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button outline-button">
              Iniciar sesión
            </Link>
            <Link to="/register" className="nav-button pink-button">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}