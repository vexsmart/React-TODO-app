import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttpFetch from "./hooks/use-httpFetch";

function App() {
  const [tasks, setTasks] = useState([]);

  

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttpFetch();

  useEffect(() => {
    const TransformTask = (taskObj) => {
      const loadedTasks = [];
  
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
  
      setTasks(loadedTasks);
    };

    fetchTasks({
      url: "https://realistic-example-b0b01-default-rtdb.firebaseio.com/task.json",
    }, TransformTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
