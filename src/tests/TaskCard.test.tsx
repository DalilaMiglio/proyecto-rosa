import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskCard } from "../components/TaskCard";
import { Task } from "../types/task";

const task: Task = {
  id: "1",
  title: "Terminar proyecto",
  description: "Completar entrega final",
  completed: false,
  userId: "user-1",
  createdAt: new Date(),
};

describe("TaskCard", () => {
  it("muestra la información de la tarea", () => {
    render(
      <TaskCard
        task={task}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Terminar proyecto")).toBeInTheDocument();
    expect(screen.getByText("Completar entrega final")).toBeInTheDocument();
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
  });

  it("muestra tarea completada", () => {
    render(
      <TaskCard
        task={{ ...task, completed: true }}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Completada")).toBeInTheDocument();
  });
});