import React, {useState} from "react";
import "../stylesheet/Form.css";
import {v4 as uuidv4} from "uuid";

function Form(props) {

    const [inputText, setInputText] = useState([]);

    const handleChange = e => {
        setInputText(e.target.value);
    };

    const handleSubmit = e => {

        e.preventDefault();

        const newTask = {
            id: uuidv4(),
            text: inputText,
            completed: false,
        };
        props.onSubmit(newTask);
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                className="task-input"
                type="text"
                name="text"
                placeholder="Add a task"
                onChange={handleChange}
            />
            <button className="task-button">Add Task</button>
        </form>
    );
}

export default Form;