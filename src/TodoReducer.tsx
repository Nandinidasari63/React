import type { Task } from "./App.tsx";

type Todo = {
  nextId: number;
  tasks: Task[];
};
export type TodoListProps = {
  todoList: Todo;
  dispatch: React.Dispatch<Action>;
};
type Action =
  | { type: "add-task"; title: string }
  | { type: "delete-task"; taskId: number }
  | { type: "toggle-done"; taskId: number };
export type TaskProps = {
  id: number;
  title: string;
  isDone: boolean;
  dispatch: React.Dispatch<Action>;
};
export const reducer = (todoList: Todo, action: Action) => {
  switch (action.type) {
    case "add-task":
      return {
        nextId: todoList.nextId + 1,
        tasks: [...todoList.tasks, {
          id: todoList.nextId,
          title: action.title,
          isDone: false,
        }],
      };
    case "delete-task":
      return {
        nextId: todoList.nextId + 1,
        tasks: todoList.tasks.filter((task) => task.id !== action.taskId),
      };

    case "toggle-done":
      return {
        nextId: todoList.nextId + 1,
        tasks: todoList.tasks.map((task) =>
          task.id !== action.taskId ? task : { ...task, isDone: !task.isDone }
        ),
      };
  }
  return todoList;
};
