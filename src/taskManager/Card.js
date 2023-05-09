import {useEffect, useRef, useState, useContext} from 'react';
import { TaskContext } from "../context/taskContext";

export default function Card({card, task}){
    const [editing, setEditing] = useState(false);
    const [editingDesc, setEditingDesc] = useState(false);
    const taskContext = useContext(TaskContext);
    const {deleteCard, updateCard} = taskContext;

    const titleRef = useRef();
    const descRef = useRef();
    // console.log(card);
    const changeHandler = (ev)=>{
        updateCard(task.id,card.id, ev.target.value, card.description);
        setEditing(false);
    }
    const changeDescHandler = (ev)=>{
        updateCard(task.id,card.id, card.title , ev.target.value);
        setEditingDesc(false);
    }

    const drag = (ev)=>{
        ev.dataTransfer.setData('dragCard', JSON.stringify({card: card, taskId: task.id}));
    }
    const titleClickHandler = ()=>{
        setEditing(true);
    }
    const descClickHandler = ()=>{
        setEditingDesc(true);
    } 
    useEffect(()=>{
        if(editing && titleRef.current){
            titleRef.current.focus();
        }
    },[editing])

    useEffect(()=>{
        if(editingDesc && descRef.current){
            console.log('focus set on desc');
            descRef.current.focus();
        }
    },[editingDesc])

    return (<div className="card" draggable={true} onDragStart={drag}>
        <div className="cross" onClick={()=> {deleteCard(task.id, card.id)}}>X</div>
        
        {editing ? 
        <div className="title">
            <input ref={titleRef} type="text" placeholder="add card title" onBlur={changeHandler} onFocus={(e)=>{e.target.value = card.title}} />
        </div>
        :
        <div className="title" onClick={titleClickHandler}>{card.title}</div>
        }

        {editingDesc ? 
        <div className="desc">
            <textarea ref={descRef} type="text" placeholder="add card description" onBlur={changeDescHandler} onFocus={(e)=>{e.target.value = card.description}} />
        </div>
        :
        <div className="desc" onClick={descClickHandler}>{card.description}</div>
        }
    </div>)
}