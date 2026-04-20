import { useState } from "react";
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
  setTodoList: (x: Todo) => void;
  addTask: (x: number, y: string) => Todo;
  toggleTask: (x: number) => Todo;
  onDelete: (x: number) => Todo;
};

const TodoList = (
  { todoList, setTodoList, addTask, toggleTask, onDelete }: TodoListProps,
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
              const state = toggleTask(id);
              setTodoList(state);
            }}
          >
            {id} : {title}
            <span>{isDone ? "✅" : "❌"}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const state = onDelete(id);
                setTodoList(state);
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
          const state = addTask(todoList.nextId, text);
          setTodoList(state);
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
  const [todoList, setTodoList] = useState<Todo>({ nextId: 1, tasks: [] });

  const addTask = (id: number, title: string): Todo => {
    return {
      nextId: todoList.nextId + 1,
      tasks: [...todoList.tasks, { id, title, isDone: false }],
    };
  };

  const toggleTask = (taskId: number): Todo => {
    return {
      nextId: todoList.nextId + 1,
      tasks: todoList.tasks.map((task) =>
        task.id !== taskId ? task : { ...task, isDone: !task.isDone }
      ),
    };
  };

  const deleteTask = (taskId: number): Todo => {
    return {
      nextId: todoList.nextId + 1,
      tasks: todoList.tasks.filter((task) => task.id !== taskId),
    };
  };

  return (
    <>
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        addTask={addTask}
        toggleTask={toggleTask}
        onDelete={deleteTask}
      />
    </>
  );
};

export default App;
