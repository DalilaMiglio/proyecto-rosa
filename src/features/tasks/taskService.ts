import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { Task } from "../../types/task";

const tasksRef = collection(db, "tasks");

export async function getTasks(userId: string): Promise<Task[]> {
  const q = query(tasksRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      title: data.title ?? "",
      description: data.description ?? "",
      completed: data.completed ?? false,
      userId: data.userId ?? "",
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
    };
  });
}

export async function createTask(
  title: string,
  description: string,
  completed: boolean,
  userId: string,
  email: string
) {
  const task = await addDoc(tasksRef, {
    title,
    description,
    completed,
    userId,
    email,
    createdAt: serverTimestamp(),
  });

  try {
    await fetch("/api/send-task-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        title,
        description,
      }),
    });
  } catch (error) {
    console.warn("La tarea se creó, pero el email no se pudo enviar.", error);
  }

  return task;
}

export async function updateTask(
  taskId: string,
  data: Partial<Pick<Task, "title" | "description" | "completed">>
) {
  const taskDoc = doc(db, "tasks", taskId);
  return updateDoc(taskDoc, data);
}

export async function deleteTask(taskId: string) {
  const taskDoc = doc(db, "tasks", taskId);
  return deleteDoc(taskDoc);
}