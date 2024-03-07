import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://100.93.3.137:3001/todo", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const createTodo = (todoData) => {
    fetch("http://100.93.3.137:3001/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    })
      .then((response) => response.json())
      .then((todo) => {
        setTodos([...todos, todo]);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault;
    const formData = new FormData(event.target);
    const newTodo = {
      id: formData.get("id"),
      title: formData.get("title"),
      description: formData.get("description"),
      isDone: formData.get("isDone"),
    };
    createTodo(newTodo);
  };
  const updateTodo = () => {};

  const deleteTodo = () => {};

  return (
    <>
      <div>
        {todos.map((x) => {
          return (
            <div>
              <Todo
                id={x.id}
                title={x.title}
                description={x.description}
                isDone={x.isDone}
              ></Todo>
            </div>
          );
        })}
      </div>
      <br></br>
      <div>
        <form onSubmit={handleSubmit}>
          <label for="id">ID : </label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="Please Enter ID here"
          />
          <br />

          <label for="title"> Ttile : </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Please Enter Ttile Here"
          />
          <br />

          <label for="description">Description : </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Please Enter description Here"
          />
          <br />

          <label for="isDone">isDone : </label>
          <input
            type="text"
            id="isDone"
            name="isDone"
            placeholder="Is it Done ?"
          />
          <br />

          <button type="submit">Add Todo</button>
          <br />
        </form>
      </div>
    </>
  );
}

function Todo(props) {
  const handleDeleteTodo = () => {};
  return (
    <div key={props.id}>
      {props.id},<br />
      {props.title},<br />
      {props.description},<br />
      {props.isDone}
      <br />
    </div>
  );
}

export default App;
