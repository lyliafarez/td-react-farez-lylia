import { useState, useEffect } from "react";
import TaskList from "./TaskList";

function TaskForm({}) {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [input, setInput] = useState("");

  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const addItem = () => {
    if (input.length > 0) {
      let new_list = items.concat({ name: input, completed: false });
      setItems(new_list);
      setInput("");
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(items));
  }, [items]);

  return (
    <div
      data-cy="task-form"
      className="flex flex-col justify-center items-center my-4"
    >
      <div className="flex flex-row gap-2">
        <input
          data-cy="task-input"
          onChange={handleInput}
          value={input}
          placeholder="Enter a task"
          className="px-2 border border-1 border-black rounded-md"
        />
        <button
          data-cy="add-task-btn"
          className="px-2 py-2 rounded-md bg-blue-300"
          onClick={addItem}
        >
          Ajouter une tâche
        </button>
      </div>

      <TaskList tasks={items} key={items} />
    </div>
  );
}

export default TaskForm;
