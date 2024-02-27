import { useEffect } from "react";

const Form = ({ input, setInput, editTodo, addNewTask, editTask, editId }) => {


  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      addNewTask()
      setInput("");
    } else {
      editTask(editId)
      
    }
    setInput("");
    
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="add a new task"
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button type="submit" className="button-add">
        {editTodo ? "edit" : "add"}
      </button>
    </form>
  );
};

export default Form;
