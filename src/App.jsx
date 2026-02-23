import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState(""); // it is only a input todo.
  const [todos, setTodos] = useState([]); //it holds all tasks.

  const startEdit = (e, id)=> {
    let t = todos.filter(t=>{return t.id === id})
    setTodo(t[0].todo)
    
    setTodos(previousTodos => previousTodos.filter(t => t.id !== id));

    
  }

  const deleteTask = (id) =>{
  
    
    
    if(confirm("Are you sure you wanna delete this task?")){
      setTodos(previousTodos => previousTodos.filter(t => t.id !== id));
    }
    // let index = todos.findIndex(item=>{
    //   return item.id === id;
    // })


  }

  function handleSave() {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  }

  const handleChange=(e)=>{
    setTodo(e.target.value);
    console.log(todos)
  }

  const handleCheckbox= (e)=> {
    let id = e.target.name;
    console.log(id)
    let index = todos.findIndex(item=>{
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos)

  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-100 rounded-2xl m-5 p-5 min-h-[70vh]">
        <div className="addTodo my-5">
          <h1 className="text-lg font-bold">Add a Todo</h1>

          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white w-1/2"
          />

          <span>
            <button
              onClick={handleSave}
              className="bg-violet-400 cursor-pointer hover:shadow-2xl dark:bg-surface-dark hover:bg-violet-950 p-3 py-1 mx-6 rounded-3xl text-sm text-white font-bold transition-all duration-100"
            >
              Save
            </button>
          </span>
        </div>

        <h1 className="text-lg font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <><div className="m-5">No todos to display.</div></>}
          {todos.map(item=>{

            return <div key={item.id} className="todo flex flex-wrap m-2 w-1/2 justify-between">
              <div className="flex gap-5">

              <input type="checkbox" onChange={handleCheckbox} value={item.isCompleted} name={item.id} id="" />

              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}

              </div>
              

              </div>
              <div className="buttons">
                <button
                  onClick={(e)=>{startEdit(e, item.id)}}
                  className="bg-violet-400 cursor-pointer hover:bg-violet-950 p-3 py-1 mx-1 rounded-3xl text-sm text-white font-bold transition-all duration-100"
                >
                  Edit
                </button>
                <button
                  onClick={()=>{deleteTask(item.id)}}
                  className="bg-violet-400 cursor-pointer hover:bg-violet-950 p-3 py-1 mx-1 rounded-3xl text-sm text-white font-bold transition-all duration-100"
                >
                  Delete
                </button>
              </div> 
            </div>;
          })}
        </div>
      </div>
      
    </>
  );
}

export default App;
