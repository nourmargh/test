import { useState } from 'react'
import react from 'react'
import { task } from './interfaces/task'
const App: React.FC=()=>{
  const [task, setTasks] = useState<task[]>([]);
  const[isOpenModel , setIsModalOpen]=useState(false);
  const[task_tile , setTitle]=useState("");
  const[editTask, setEditTask]=useState<number|null>(null);
const addTask=()=>{
  const newTask: task={
    id:Date.now(),
    title:'nouvelle tache',
    compleated : false,
  };
  setTasks([...task,newTask]);

  };
  const modifier=(id:number)=>{
    const taskToEdit=task.find(t=>t.id===id);
    if(taskToEdit)
    {
      setEditTask(id);
      setTitle(taskToEdit.title);
      setIsModalOpen(true);
    }
    
    
    
  }
  
  const SupprimerTask=(id:number)=>{
                
    const updateTask=  task.filter(t=>t.id!==id)

      setTasks(updateTask);
  }
  const save_title=()=>{
    task.map(t=>t.id===editTask? {...t, title:task_tile}:t);
    setIsModalOpen(false);
setEditTask(null);
    setTitle("");



  }
return(
  <div>
    <h1>Gestion  des taches</h1>
    <button onClick={addTask}>Ajouter une tache </button>
      <ul>
        {task.map(i=>(
          <li key={i.id}>{i.title}-{i.compleated ? 'terminé' : 'EN COURS'}
          <button onClick={()=>SupprimerTask(i.id)}>Supprimer</button>
          <button onClick={()=>modifier(i.id)}>Modifier tache</button>
          </li>
          
        ))}
      </ul>
      {isOpenModel && (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    > 
    <h2>Modifier la tâche</h2>
    <input type="text" value={task_tile} onChange={e=>setTitle(e.target.value)}></input>
    <button onClick={save_title}>Enregistrer</button>
    </div>)};
  </div>
  
);
}


export default App
