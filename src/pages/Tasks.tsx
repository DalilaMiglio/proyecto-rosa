import { FormEvent, useState } from "react";
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
      <section className="page-title">
        <h1>📋 Mis Tareas</h1>
      </section>

      <p>
        Sesión: <strong>{user?.email}</strong>
      </p>

      <form className="card task-form" onSubmit={handleSubmit}>
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
          placeholder="Agrega detalles sobre la tarea"
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

        <button>Crear tarea</button>
      </form>

      <section className="tasks-list">
        {loading && <p>Cargando tareas...</p>}

        {tasks.map((task) => (
          <article key={task.id} className="card task-item">
            <div>
              <h3 className={task.completed ? "done" : ""}>{task.title}</h3>
              <p>{task.description || "Sin descripción"}</p>
              <small>
                Estado: {task.completed ? "Completada" : "Pendiente"}
              </small>
            </div>

            <div className="actions">
              <button onClick={() => toggleTask(task)}>
                {task.completed ? "Pendiente" : "Completar"}
              </button>
              <button className="danger" onClick={() => removeTask(task.id)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}