import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../features/tasks/taskService";
import { Task } from "../types/task";

export function useTasks(userId?: string, email?: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadTasks() {
    if (!userId) return;

    setLoading(true);

    try {
      const data = await getTasks(userId);
      setTasks(data);
    } catch (error) {
      console.error("Error cargando tareas:", error);
      alert("No se pudieron cargar las tareas. Revisá Firestore.");
    } finally {
      setLoading(false);
    }
  }

  async function addTask(title: string, description: string, completed: boolean) {
    if (!userId || !email) {
      alert("No hay usuario autenticado.");
      return;
    }

    try {
      await createTask(title, description, completed, userId, email);
      await loadTasks();
    } catch (error) {
      console.error("Error creando tarea:", error);
      alert("No se pudo crear la tarea. Revisá las reglas de Firestore.");
    }
  }

  async function toggleTask(task: Task) {
    try {
      await updateTask(task.id, { completed: !task.completed });
      await loadTasks();
    } catch (error) {
      console.error("Error actualizando tarea:", error);
      alert("No se pudo actualizar la tarea.");
    }
  }

  async function removeTask(taskId: string) {
    try {
      await deleteTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error("Error eliminando tarea:", error);
      alert("No se pudo eliminar la tarea.");
    }
  }

  useEffect(() => {
    loadTasks();
  }, [userId]);

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
    removeTask,
  };
}