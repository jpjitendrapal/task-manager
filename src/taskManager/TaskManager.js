import { useEffect, useState } from "react";
import Tasks from "./Tasks";
import Header from "./../layout/header";
import { getId } from "./../utility";
import { TaskContext } from "../context/taskContext";
import "./tasks.css";
import "./cards.css";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasksList"));
    if (tasks) {
      setTasks(tasks);
      setFilteredTasks(tasks);
    }
    return () => {
      localStorage.setItem("tasksList", JSON.stringify(tasks));
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasks));
    setFilteredTasks(tasks);
  }, [tasks]);

  const addTask = (event) => {
    setTasks([
      ...tasks,
      {
        id: getId(),
        name: "Enter List name",
        cards: [],
      },
    ]);
  };

  const deleteTask = (taskId) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        tasks.splice(i, 1);
      }
    }
    setTasks([...tasks]);
  };

  const addCard = (taskId, card) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        if (card) {
          tasks[i].cards.push(card);
        } else {
          tasks[i].cards.push({
            id: getId(),
            title: "card title",
            description: "Card description",
          });
        }
      }
    }
    setTasks([...tasks]);
  };
  const updateCard = (taskId, cardId, cardTitle, cardDescription) => {
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.id === taskId) {
        for (let j = 0; j < task.cards.length; j++) {
          if (task.cards[j].id === cardId) {
            task.cards[j].title = cardTitle;
            task.cards[j].description = cardDescription;
          }
        }
      }
    }
    setTasks([...tasks]);
  };
  const updateTask = (taskId, name) => {
    // debugger;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        tasks[i].name = name;
      }
    }
    setTasks([...tasks]);
  };
  const deleteCard = (taskId, cardId) => {
    // debugger;
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.id === taskId) {
        for (let j = 0; j < task.cards.length; j++) {
          if (task.cards[j].id === cardId) {
            task.cards.splice(j, 1);
          }
        }
      }
    }
    setTasks([...tasks]);
  };
  const searchHandler = (ev) => {
    let keyword = ev.target.value;
    let filterData = [];
    if (keyword) {
      filterData = tasks.filter((task) => {
        if (task.name.indexOf(keyword) > -1) {
          return task;
        }
        return null;
      });
      setFilteredTasks(filterData);
    } else {
      setFilteredTasks(tasks);
    }
  };
  console.log(tasks);
  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addCard,
        deleteCard,
        updateCard,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      <div className="tasks-ct">
        <Header addTask={addTask} searchHandler={searchHandler} />
        <Tasks
          tasks={filteredTasks}
          addCard={addCard}
          deleteCard={deleteCard}
          updateTask={updateTask}
          updateCard={updateCard}
          deleteTask={deleteTask}
        />
      </div>
    </TaskContext.Provider>
  );
}
