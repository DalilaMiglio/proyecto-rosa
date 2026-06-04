import { describe, expect, it } from "vitest";
import { formatTaskStatus, isValidTaskTitle } from "../utils/taskValidations";

describe("taskValidations", () => {
  it("valida títulos correctos", () => {
    expect(isValidTaskTitle("Terminar proyecto")).toBe(true);
  });

  it("rechaza títulos vacíos o muy cortos", () => {
    expect(isValidTaskTitle("")).toBe(false);
    expect(isValidTaskTitle("  ")).toBe(false);
    expect(isValidTaskTitle("ab")).toBe(false);
  });

  it("formatea correctamente el estado de una tarea", () => {
    expect(formatTaskStatus(true)).toBe("Completada");
    expect(formatTaskStatus(false)).toBe("Pendiente");
  });
});