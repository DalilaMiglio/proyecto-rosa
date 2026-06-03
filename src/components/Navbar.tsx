import { Link } from "react-router-dom";
import { logout } from "../features/auth/authService";

interface Props {
  email?: string | null;
}

export function Navbar({ email }: Props) {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        📝 GestorTareas
      </Link>

      <nav>
        <Link to="/about">Acerca de</Link>
        {email && <Link to="/tasks">Mis Tareas</Link>}
        {email && <span className="email">{email}</span>}
        {email ? (
          <button onClick={logout} className="outline danger">
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link to="/login" className="outline">
              Iniciar sesión
            </Link>
            <Link to="/register" className="outline">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}