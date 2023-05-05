import './App.css';
import { AppContext } from './context/taskContext';
import TaskManager from './taskManager/TaskManager';

function App() {
  
  return (
    <AppContext.Provider value={{}}>
      <div className="App">
        <TaskManager />
      </div>
    </AppContext.Provider>
  );
}

export default App;
