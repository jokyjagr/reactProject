import './App.css';
import Logo from './components/Logo.jsx';
import TaskList from "./components/TaskList";

function App() {
    return (
        <div className="task-system">
            <Logo/>
            <div className="principal-task-list">
                <h1>
                    My Tasks
                </h1>
                <TaskList/>
            </div>
        </div>
    );
}

export default App;
