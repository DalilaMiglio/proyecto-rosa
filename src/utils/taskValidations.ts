export function isValidTaskTitle(title: string): boolean {
  return title.trim().length >= 3;
}

export function formatTaskStatus(completed: boolean): string {
  return completed ? "Completada" : "Pendiente";
}