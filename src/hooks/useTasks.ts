import { useEffect, useState } from "react";
import { Task } from "../types/task";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../features/tasks/taskService";

export function useTasks(userId?: string, email?: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadTasks() {
    if (!userId) return;

    setLoading(true);
    const data = await getTasks(userId);
    setTasks(data);
    setLoading(false);
  }

  async function addTask(title: string, description: string, completed: boolean) {
    if (!userId || !email) return;

    await createTask(title, description, completed, userId, email);
    await loadTasks();
  }

  async function toggleTask(task: Task) {
    await updateTask(task.id, { completed: !task.completed });
    await loadTasks();
  }

  async function removeTask(taskId: string) {
    await deleteTask(taskId);
    await loadTasks();
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