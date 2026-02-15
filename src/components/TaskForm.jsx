/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm({ addTask, editingTask, updateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate || "");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (editingTask) {
      updateTask({
        ...editingTask,
        title,
        description,
        priority,
        dueDate,
      });
    } else {
      const newTask = {
        id: uuidv4(),
        title,
        description,
        priority,
        dueDate,
        createdAt: Date.now(),
        status: "Todo",
      };

      addTask(newTask);
    }

    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>{editingTask ? "Edit Task" : "Create Task"}</h3>

      {error && <p style={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={styles.input}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignSelf: "center",
    background: "lightblue",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "600px",
    marginBottom: "20px",

  },
  input: {
    height: "40px",
    fontFamily: "inherit",
    fontSize: "16px",
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "4px",
    background: "#007bff",
    color: "white",
    alignSelf: "center",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};
