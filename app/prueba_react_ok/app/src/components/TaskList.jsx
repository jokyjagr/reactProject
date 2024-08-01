import React, {useState} from "react";
import Task from "./Task";
import "../stylesheet/Tasklist.css";
import Form from "./Form";

function TaskList() {

    const [tasks, setTasks] = useState([]);

    const addTask = task => {
        let text = task.text.trim();
        if (text.length > 0) {
            const updatedTasks = [task, ...tasks];
            setTasks(updatedTasks);
        }
    };

    const deleteTask = id => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    const completeTask = id => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <>
            <div className="task-list-container">
                <Form onSubmit={addTask}/>
                {
                    tasks.map((task) =>
                        <Task
                            key={task.id}
                            id={task.id}
                            text={task.text}
                            completed={task.completed}
                            completeTask={completeTask}
                            removeTask={deleteTask}/>
                    )
                }
            </div>
        </>
    );
}

export default TaskList;