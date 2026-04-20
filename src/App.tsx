import { useReducer, useState } from "react";
import "./App.css";
type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type Todo = {
  nextId: number;
  tasks: Task[];
};

type TodoListProps = {
  todoList: Todo;
  dispatch: React.Dispatch<Action>;
};

type Action =
  | { type: "add-task"; title: string }
  | { type: "delete-task"; taskId: number }
  | { type: "toggle-done"; taskId: number };

const reducer = (todoList: Todo, action: Action) => {
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

const TodoList = (
  { todoList, dispatch }: TodoListProps,
) => {
  const [text, setText] = useState("");

  return (
    <>
      <ul>
        {todoList.tasks.map(({ id, title, isDone }) => (
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
  // const [todoList, setTodoList] = useState<Todo>({ nextId: 1, tasks: [] });
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
