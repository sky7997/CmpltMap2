import React, { useState ,useEffect} from "react";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Add or Update Todo
  useEffect(()=>{
    fetch("http://localhost:5000/todos")
    
    .then(res=>res.json())
    .then(dat=>setTodos(dat))
},[])
  const addOrUpdateTodo = () => {
    if (!task) return;

    if (editId) {
        const chng={todo:task}
        fetch(`http://localhost:5000/todos/${editId}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(chng)
        }).then(res=>res.json())
        .then(dat=>{
            setTodos(prev=>prev.map(t=>t._id===editId ? {...t,todo:dat.todo}:t))
            setEditId(null)
            setTask("")
            
        })
    } else {
        const data={todo:task,completed:false}
        fetch("http://localhost:5000/todos",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(res=>res.json())
        .then(dat=>{
            setTodos(prev=>[...prev,dat])
            setTask("")
            setSearchResults([])
        });
    }

   
  };

  // Mark Task as Complete
  const toggleComplete = (id) => {
    const fnd=todos.find(t=>t._id===id)
    const chng={completed:!fnd.completed}
        fetch(`http://localhost:5000/todos/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(chng)
        }).then(res=>res.json())
        .then(dat=>{
            setTodos(prev=>prev.map(t=>t._id===id ? {...t,completed:dat.completed}:t))
            
        })
  };

  // Delete Task
  const deleteTodo = (id) => {
   
        fetch(`http://localhost:5000/todos/${id}`,{
            method:"DELETE",
        
        }).then(res=>res.json())
        
            setTodos(todos.filter(todo => todo._id !== id));
        
            
            
        }
    

  // Edit Task
  const editTodo = (id, text) => {
    setTask(text);
    setEditId(id);
  };

  // Search Tasks
  const handleSearch = () => {
    const results = todos.filter(todo =>
      todo.todo.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <h2>Todo List</h2>

      {/* Search Input and Button */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
      />
      <button onClick={handleSearch}>Search</button>

      {/* Add/Edit Input */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addOrUpdateTodo}>{editId ? "Update" : "Add"}</button>

      {/* Show todos or search results */}
      <ul>
        {(search ? searchResults : todos).length > 0 ? (
          (search ? searchResults : todos).map(todo => (
            <li key={todo._id}>
              <span 
                onClick={() => toggleComplete(todo._id)}
                style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              >
                {todo.todo}
              </span>
              <button onClick={() => editTodo(todo._id, todo.todo)}>Edit</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>
    </div>
  );
};

export default Todos;