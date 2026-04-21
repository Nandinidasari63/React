import { useContext, useState } from "react";
import { useImmerReducer } from "use-immer";
import { TodoContext, TodoDispatchContext } from "./context.tsx";
import "./App.css";
import { ActionTypes, reducer, type TaskProps } from "./TodoReducer.tsx";

export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export const Task = ({ id, title, isDone }: TaskProps) => {
  const dispatch = useContext(TodoDispatchContext);
  return (
    <li
      key={id}
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: ActionTypes.TOGGLE_DONE, taskId: id });
      }}
    >
      {id} : {title}
      <span>{isDone ? "✅" : "❌"}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: ActionTypes.DELETE_TASK, taskId: id });
        }}
      >
        delete
      </button>
    </li>
  );
};

const TodoList = () => {
  const [text, setText] = useState("");
  const todoList = useContext(TodoContext);
  const dispatch = useContext(TodoDispatchContext);

  return (
    <>
      <ul>
        {todoList.tasks.map(({ id, title, isDone }) => (
          <Task
            key={id}
            id={id}
            isDone={isDone}
            title={title}
          />
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: ActionTypes.ADD_TASK, title: text });
          setText("");
        }}
      >
        <input
          value={text}
          type="text"
          placeholder="add todo"
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </>
  );
};

const App = () => {
  const [todoList, dispatch] = useImmerReducer(reducer, {
    nextId: 1,
    tasks: [],
  });
  return (
    <>
      <TodoContext value={todoList}>
        <TodoDispatchContext value={dispatch}>
          <TodoList />
        </TodoDispatchContext>
      </TodoContext>
    </>
  );
};

export default App;
