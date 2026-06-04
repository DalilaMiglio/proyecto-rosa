import { Task } from "../types/task";
import { formatTaskStatus } from "../utils/taskValidations";

interface Props {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onToggle, onDelete }: Props) {
  return (
    <article className="task-item">
      <button
        type="button"
        className={task.completed ? "status completed" : "status"}
        onClick={() => onToggle(task)}
        aria-label="Cambiar estado"
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="task-content">
        <h3 className={task.completed ? "done" : ""}>{task.title}</h3>
        <p>{task.description || "Sin descripción"}</p>
        <small>{formatTaskStatus(task.completed)}</small>
      </div>

      <div className="actions">
        <button type="button" onClick={() => onToggle(task)}>
          ✎
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          🗑
        </button>
      </div>
    </article>
  );
}