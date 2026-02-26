import { useState , useEffect} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState(""); // it is only a input todo.
  const [showfinished, setshowFinished] = useState()


  const [todos, setTodos] = useState(()=>{
    try {
    const raw = localStorage.getItem("todos");
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    console.log(parsed)
    if (!Array.isArray(parsed)) return [];

    return parsed.map(t => {
      // normalize isCompleted safely (handle boolean or "true"/"false" string)
      const isCompleted =
        typeof t.isCompleted === "boolean"
          ? t.isCompleted
          : t.isCompleted === "true";
          console.log(t.isCompleted === "true")

      return {
        id: t.id ?? uuidv4(),             // preserve id or generate fallback
        todo: typeof t.todo === "string" ? t.todo : "",
        isCompleted,
      };
    });
  } catch (err) {
    console.error("Error reading todos from localStorage:", err);
    return [];
  }

  }); //it holds all tasks.


  useEffect(() => {

    try{
      localStorage.setItem("todos", JSON.stringify(todos))
    }catch(err){
      console.error("Failed to write todos to localStorage:", err);

    }
  }, [todos])

  const toggleHandler = () =>{
    setshowFinished(!showfinished)
  }
  
    
  const startEdit = (e, id)=> {
    let t = todos.filter(t=>{return t.id === id})
    setTodo(t[0].todo)
    
    setTodos(previousTodos => previousTodos.filter(t => t.id !== id));
   
  }





  const deleteTask = (id) =>{
  
    
     
    if(confirm("Are you sure you wanna delete this task?")){
      setTodos(previousTodos => previousTodos.filter(t => t.id !== id));
     
    }
    
  }

  function handleSave() {
    const text = todo.trim();
    if (!text) return;
    setTodos([...todos, {id: uuidv4(), todo: text, isCompleted: false }]);
    setTodo("");
    

  }

  const handleChange=(e)=>{
    setTodo(e.target.value);

    
  }

  const handleCheckbox= (id)=> {
   setTodos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
   
  
  }


  return (
    <>
      <Navbar />
      <div className=" md:container md:mx-auto bg-violet-100 rounded-2xl m-5 p-5 min-h-[70vh] md:w-1/2 ">

        <h1 className="font-bold text-center text-2xl" >DayDo - Do all your tasks.</h1>  
        <div className="addTodo my-5 flex flex-col">
          <h1 className="text-lg font-bold my-1">Add a Todo</h1>

          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white w-full my-3 rounded-full p-2.5 px-5"
          />
 
          <span>
            <button
              onClick={handleSave}
              disabled={todo.length<=3}
              className="bg-violet-400 gap-4 disabled:bg-gray-400 cursor-pointer enabled:hover:shadow-2xl enabled:dark:bg-surface-dark hover:bg-violet-800 p-3 py-1 rounded-3xl text-sm text-white font-bold transition-all duration-100 w-full my-2"
            >
              Save
            </button>
          </span>
        </div>


        <div className="flex items-center ps-4 bg-neutral-primary-soft border border-gray-400 rounded-xl shadow-md p-2 m-5">
          <input type="checkbox" onChange={toggleHandler}  checked={showfinished} className="my-3 mx-3 w-4 h-4 focus:ring-2 focus:ring-brand-soft focus:ring-blue-300 " /> Show finished.

        </div>


        <h1 className="text-lg font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <><div className="m-5">No todos to display.</div></>}
          {todos.map(item=>{


            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex flex-row m-2 md:w-1/2 justify-between">
              <div className="flex gap-5">

              <input type="checkbox" checked={!!item.isCompleted} onChange={()=>{handleCheckbox(item.id)}} />

              <div className={item.isCompleted ? "line-through" : "" }>
                {item.todo}

              </div>
              

              </div>
              <div className="buttons flex">
                <button
                  onClick={(e)=>{startEdit(e, item.id)}}
                  className="bg-violet-400 cursor-pointer hover:bg-violet-950 p-3 py-1 mx-1 rounded-3xl text-sm text-white font-bold transition-all duration-100"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={()=>{deleteTask(item.id)}}
                  className="bg-violet-400 cursor-pointer hover:bg-violet-950 p-3 py-1 mx-1 rounded-3xl text-sm text-white font-bold transition-all duration-100"
                >
                  <MdDelete />
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
