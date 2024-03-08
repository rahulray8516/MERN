import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [todos, setTodos] = useState([])
    // fetch all todos from server

    useEffect(() => {
      fetch("http://localhost:3001/todo",{
        method : 'GET',
    })
    .then(response => response.json())
    .then(data => setTodos(data))
    },[])
    
    const deleteTodo = (id) => {
        fetch(`http://localhost:3001/todo/${id}`,{
          method : 'DELETE',
        })
        .then(response => response.json())
        .then(() => {
            setTodos(todos.filter( x => x.id !==id ))
        });
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target)
      const newTodo = {
           
           title : formData.get('title'),
           description : formData.get('description'),
           isDone : formData.get('isDone') === 'true',
           id : formData.get('id')
        }
        createTodo(newTodo)
        event.target.reset
    }

    const createTodo = (todo) => {
        fetch("http://localhost:3001/todo",{
          method : 'POST',
          headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(todo),
        })
        .then(response => response.json())
        .then((newTodo) => { 
          setTodos([...todos,newTodo])
        })
    }
    

  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        {
          todos.map((x) => {
              return <Todo key = {x.id} id = {x.id} title = {x.title} 
              description = {x.description} isDone = {x.isDone}
              onDelete = {deleteTodo} ></Todo>
          })
        }
      </div>
      <div id='create-todo'>
          <form onSubmit={handleSubmit}>
              <label for='id'>ID : </label>
              <input type='text' id='id' name='id' placeholder='id'/>
              <br/>
              <label for='title'>Title : </label>
              <input type='text' id='title' name='title' placeholder='Enter title' required/>
              <br/>
              <label for='description'>Description : </label>
              <input type='text' id='description' name='description' placeholder='Enter Description'/>
              <br/>
              <label for='isDone'>isDone : </label>
              <select id='isDone' name='isDone' required>
                <option value='true'>True</option>
                <option value='false'>False</option>
              </select>

              <br/>
              <button > Submit </button>
          </form>
      </div>
    </>
  )
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    const handleDeleteTodo = () => {
        props.onDelete(props.id)
    };

 
    return (
        <div key={props.id}>
          {props.id}<br/>
            {props.title}<br/>
            {props.description}<br/>
            {props.isDone}<br/>
            <button onClick={handleDeleteTodo}>Delete</button>
        </div>
    );
}

export default App
