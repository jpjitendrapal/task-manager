import Task from "./Task";


export default function Tasks({tasks=[], addCard, deleteCard, updateTask, updateCard, deleteTask}){
    
    return (<div className="tasks">
        {tasks.map(task => {
            return <Task addCard={addCard} key={task.id} task={task} deleteCard={deleteCard} updateTask={updateTask} updateCard={updateCard} deleteTask={deleteTask} />
        })}
    </div>)
}