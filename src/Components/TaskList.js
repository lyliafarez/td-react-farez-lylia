import { useState, useEffect } from "react";
function TaskList({ tasks }) {
  const [items, setItems] = useState(tasks);
  const [filtered_items, setFilteredItems] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    setFilteredItems(JSON.parse(localStorage.getItem("tasks")));
    localStorage.setItem("tasks", JSON.stringify(items));
  }, [items]);

  const filterTasks = (filter) => {
    if (filter === "Completed") {
      let list = items.filter((item) => item.completed === true);
      setFilteredItems(list);
    } else if (filter === "NonCompleted") {
      let list = items.filter((item) => item.completed === false);
      setFilteredItems(list);
    } else {
      setFilteredItems(items);
    }
  };
  const updateState = (index) => {
    let item = filtered_items[index];
    if (item.completed === true) {
      item.completed = false;
    } else {
      item.completed = true;
    }

    setItems(filtered_items);
    window.location.reload();
  };

  return (
    <div data-cy="task-list" className="my-5">
      {/* filters */}
      <div className="flex flex-row gap-2">
        <button
          data-cy="filter-btn-all"
          className="px-2 py-1 rounded-md bg-blue-300"
          type="submit"
          onClick={(e) => filterTasks("All")}
        >
          Tous
        </button>
        <button
          data-cy="filter-btn-done"
          className="px-2 py-1 rounded-md bg-green-300"
          type="submit"
          onClick={(e) => filterTasks("Completed")}
        >
          Complétées
        </button>
        <button
          data-cy="filter-btn-undone"
          className="px-2 py-1 rounded-md bg-red-300"
          type="submit"
          onClick={(e) => filterTasks("NonCompleted")}
        >
          Non complétées
        </button>
      </div>
      <div className="my-4 flex flex-col gap-3">
        {filtered_items.map((item, index) => {
          return (
            <div className="" key={index}>
              <button
                className="px-2 py-1 rounded-md w-full completed"
                style={{
                  backgroundColor: item.completed === true ? "green" : "red",
                }}
                onClick={(e) => {
                  updateState(index);
                }}
                data-cy="task-item"
              >
                {item.text}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskList;
