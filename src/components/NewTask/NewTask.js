import useHttpFetch from "../../hooks/use-httpFetch";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttpFetch();
  
  const taskCreate = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: "https://realistic-example-b0b01-default-rtdb.firebaseio.com/task.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {text: taskText}
    }, taskCreate.bind(null, taskText))

  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
