import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { Task } from "../../types/task";

const tasksRef = collection(db, "tasks");

export async function getTasks(userId: string): Promise<Task[]> {
  const q = query(
    tasksRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
    createdAt: document.data().createdAt?.toDate?.() ?? new Date(),
  })) as Task[];
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
    createdAt: serverTimestamp(),
  });

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