import { useReducer, useState } from "react";
import "./App.css";
import { reducer, type TaskProps, type TodoListProps } from "./TodoReducer.tsx";

export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export const Task = ({ id, title, isDone, dispatch }: TaskProps) => {
  return (
    <li
      key={id}
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: "toggle-done", taskId: id });
      }}
    >
      {id} : {title}
      <span>{isDone ? "✅" : "❌"}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: "delete-task", taskId: id });
        }}
      >
        delete
      </button>
    </li>
  );
};

const TodoList = (
  { todoList, dispatch }: TodoListProps,
) => {
  const [text, setText] = useState("");

  return (
    <>
      <ul>
        {todoList.tasks.map(({ id, title, isDone }) => (
          <Task
            key={id}
            id={id}
            isDone={isDone}
            title={title}
            dispatch={dispatch}
          />
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "add-task", title: text });
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
  const [todoList, dispatch] = useReducer(reducer, {
    nextId: 1,
    tasks: [],
  });
  return (
    <>
      <TodoList
        todoList={todoList}
        dispatch={dispatch}
      />
    </>
  );
};

export default App;
