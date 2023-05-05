import "./layout.css";

export default function Header({addTask, searchHandler}){
    
    return (<header className="">
        <div>Todo List</div>
        <div>
            <input type="text" placeholder="Search" onChange={searchHandler} />
        </div>
        <button onClick={addTask}>Add List</button>
    </header>)
}