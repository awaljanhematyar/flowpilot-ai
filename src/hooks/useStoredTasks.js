// Reactive task storage with a visible fallback when browser persistence is unavailable.
import { useState } from "react";
import { initialTasks } from "../data/content";
import { readStored, saveStored, TASK_KEY, validTasks } from "../utils/storage";
export function useStoredTasks() {
  const [tasks, setTasks] = useState(() =>
    readStored(TASK_KEY, initialTasks, validTasks),
  );
  const [storageError, setStorageError] = useState(false);
  function updateTasks(next) {
    setTasks(next);
    setStorageError(!saveStored(TASK_KEY, next));
  }
  return { tasks, updateTasks, storageError };
}
