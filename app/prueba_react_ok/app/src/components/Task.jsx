import React from "react";
import '../stylesheet/Task.css';
import {AiFillDelete} from "react-icons/ai";

function Task({id, text, completed, completeTask, removeTask}) {
    return (
        <div className={completed ? 'task-container completed' : 'task-container'}>
            <div className="task-text" onClick={() => completeTask(id)}>
                {text}
            </div>
            <div className="task-container-icon" onClick={() => removeTask(id)}>
                <AiFillDelete className="task-icon"/>
            </div>
        </div>
    );
}

export default Task;