import React from "react";
import { nanoid } from "nanoid";
import Task from "./components/Task";
import "./css/scss/style.scss";

export default function App() {
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem('tasksFromLocal')) || []
  );

  const [filtredTasks, setFilteredTasks] = React.useState([]);

  const [formData, setFormData] = React.useState({
    taskTxt: "",
    filter: "all",
  });

  function addTask(event) {
    event.preventDefault();
    if (formData.taskTxt) {
      setTasks((tasks) => [
        ...tasks,
        {
          id: nanoid(),
          title: formData.taskTxt,
          check: false,
        },
      ]);
      setFormData({...formData, taskTxt: "" });
    }
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function removeCheck(id) {
    setTasks((tasks) => tasks.filter((task) => task.id != id));
  }

  const tasksElements = filtredTasks.map((task) => (
    <Task
      key={task.id}
      title={task.title}
      check={task.check}
      clickHundler={() => changeCheck(task.id)}
      removehundle={() => removeCheck(task.id)}
    />
  ));

  function changeCheck(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id == id ? { ...task, check: !task.check } : task
      )
    );
  }
React.useEffect(()=>{
  localStorage.setItem('tasksFromLocal',JSON.stringify(tasks))
},[tasks])

  React.useEffect(() => {
    if (formData.filter === "completed") {
      setFilteredTasks(tasks.filter((task) => task.check)); 
    } else if (formData.filter === "pending") {
      setFilteredTasks(tasks.filter((task) => !task.check));
    } else {
      setFilteredTasks(tasks); 
    }
  }, [formData.filter, tasks]);

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <form className="taskAdder">
        <div className="taskhandle">
          <input
            type="text"
            placeholder="Add your task"
            name="taskTxt"
            onChange={handleChange}
            value={formData.taskTxt}
          />
          <button className="addBtn" onClick={addTask}>
            Add
          </button>
        </div>

        <main className="radioGroup">
          <div>
            <input
              name="filter"
              type="radio"
              value="all"
              checked={formData.filter == "all"}
              id="all"
              onChange={handleChange}
            />
            <label htmlFor="all">all</label>
          </div>
          <div>
            <input
              name="filter"
              type="radio"
              checked={formData.filter == "completed"}
              value="completed"
              onChange={handleChange}
              id="completed"
            />
            <label htmlFor="completed">completed</label>
          </div>
          <div>
            <input
              name="filter"
              type="radio"
              value="pending"
              checked={formData.filter == "pending"}
              onChange={handleChange}
              id="panding"
            />
            <label htmlFor="panding">pending</label>
          </div>
        </main>
      </form>

      <main className="tasksContainer">{tasksElements}</main>
    </div>
  );
}
