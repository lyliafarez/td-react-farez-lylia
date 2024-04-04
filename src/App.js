import "./App.css";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import { useState, useEffect } from "react";
function App() {
  return (
    <div className="App">
      <TaskForm />
    </div>
  );
}

export default App;
