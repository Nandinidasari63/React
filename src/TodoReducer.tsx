import type { Task } from "./App.tsx";

type Todo = {
  nextId: number;
  tasks: Task[];
};

export enum ActionTypes {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_DONE,
}

type Action =
  | { type: ActionTypes.ADD_TASK; title: string }
  | { type: ActionTypes.DELETE_TASK; taskId: number }
  | { type: ActionTypes.TOGGLE_DONE; taskId: number };

export type TaskProps = {
  id: number;
  title: string;
  isDone: boolean;
};

export const reducer = (draft: Todo, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      draft.tasks.push({
        id: draft.nextId,
        title: action.title,
        isDone: false,
      });
      draft.nextId += 1;
      break;

    case ActionTypes.DELETE_TASK:
      draft.tasks = draft.tasks.filter(
        (task) => task.id !== action.taskId,
      );
      break;

    case ActionTypes.TOGGLE_DONE: {
      const task = draft.tasks.find(
        (task) => task.id === action.taskId,
      );
      if (task) {
        task.isDone = !task.isDone;
      }
      break;
    }
  }
};
