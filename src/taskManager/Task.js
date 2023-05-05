import Cards from "./Cards";
import {useRef, useState, useContext} from 'react';
import { TaskContext } from "../context/taskContext";

export default function Task({task}){
    const taskContext = useContext(TaskContext);
    const {addCard, updateTask, deleteCard, deleteTask} = taskContext;
    const [editing, setEditing] = useState(false);
    const taskName = useRef();
    const clickHandler=()=>{
        updateTask(task.id, taskName.current.value);
        setEditing(false);
    }
    const allowDrop = (ev)=>{
        ev.preventDefault();
    }

    const drop = (ev)=>{
        ev.preventDefault();
        let data = JSON.parse(ev.dataTransfer.getData('dragCard'));
        console.log(data);
        deleteCard(data.taskId, data.card.id);
        addCard(task.id, data.card);
    }
    return (<div className="task" onDrop={drop} onDragOver={allowDrop}>
        <div className="cross" onClick={()=>deleteTask(task.id)}>X</div>
        {editing ? 
        <div className="title">
            <input ref={taskName} type="text" placeholder="Add task name" />
            <button onClick={clickHandler}>Update</button>
        </div>
        :
        <div className="title" onClick={()=>{setEditing(true)}}>{task.name}</div>
        }
        <div className="separator"></div>
        <Cards cards={task.cards} task={task} />
        <div className="add-card-btn" onClick={()=>{addCard(task.id)}}>+ Add Card</div>
    </div>)
}