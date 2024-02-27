import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Header from "./Components/Header";
import axios from "axios";
import TodosList from "./Components/TodosList";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editId, setEditId] = useState("");

  const fetchData =()=> {axios
  .get("http://localhost:8000/todos") 
  .then((response) => {
    setTodos(response.data);
    return response});
  }

  useEffect(() => {
    fetchData()
  }, []);

  const addNewTask = () => {
    axios.post('http://localhost:8000/todos' , {
    id: uuidv4(),
    title: input,
    completed: false
  })
  .then(function (response) {
    fetchData()
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  };

  const deleteTask = (id) => {
    axios.delete("http://localhost:8000/todos/" + id)
      .then(function(response) {
        fetchData();
        console.log(response)
      }).catch(function(error) {
        console.log(error)
      })
  }
   
  const editTask = (id) => {
    axios.put("http://localhost:8000/todos/" + id , {
      id:id,
      title:input,
      completed: false
    })
      .then(function() {
        fetchData()
      }).catch(function(error) {
        console.log(error)
      })
  }

  return (
    <div className="container">
    
      <div className="app-wrapper">
        <div>
          <Header />
        </div>

        <div>
          <Form
            input={input}
            setInput={setInput}
            editTodo={editTodo}
            addNewTask={addNewTask}
            editTask={editTask}
            editId={editId}
          />
        </div>

        <div>
          <TodosList
            key={todos.id}
            todos={todos}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
            deleteTask={deleteTask}
            setEditId={setEditId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
