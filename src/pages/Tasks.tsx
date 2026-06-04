import { FormEvent, useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { logout } from "../features/auth/authService";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";

export function Tasks() {
  const { user } = useAuth();
  const { tasks, loading, addTask, toggleTask, removeTask } = useTasks(
    user?.uid,
    user?.email
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title.trim()) return;

    await addTask(title, description, completed);

    setTitle("");
    setDescription("");
    setCompleted(false);
  }

  return (
    <main className="tasks-page">
      <section className="tasks-header">
        <div>
          <h1>📋 Mis Tareas</h1>
          <p>
            Sesión: <strong>{user?.email}</strong>
          </p>
        </div>

        <button onClick={logout} className="logout-button">
          Cerrar sesión
        </button>
      </section>

      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Crear tarea</h2>

        <label>Título de la tarea</label>
        <input
          placeholder="Ej: Terminar proyecto..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Descripción</label>
        <textarea
          placeholder="Agrega detalles sobre la tarea (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Marcar como completada al crear
        </label>

        <button type="submit">Crear tarea</button>
      </form>

      <h2 className="tasks-subtitle">Mis tareas</h2>

      <section className="tasks-list">
        {loading && <p>Cargando tareas...</p>}

        {!loading && tasks.length === 0 && (
          <p className="empty">Todavía no creaste tareas.</p>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={removeTask}
          />
        ))}
      </section>
    </main>
  );
}