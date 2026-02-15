import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import ActivityLog from "../components/ActivityLog";

export default function Board() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [logs, setLogs] = useState(() => {
    try {
      const savedLogs = localStorage.getItem("logs");
      return savedLogs ? JSON.parse(savedLogs) : [];
    } catch {
      return [];
    }
  });

  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  const addLog = (message) => {
    setLogs((prev) => [{ message, time: Date.now() }, ...prev]);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    addLog(`Task "${newTask.title}" created`);
  };

  const deleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setTasks((prev) => prev.filter((task) => task.id !== id));
    addLog(`Task "${task.title}" deleted`);
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    addLog(`Task "${updatedTask.title}" edited`);
    setEditingTask(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = tasks.find((t) => t.id === taskId);

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );

    addLog(`Task "${task.title}" moved to ${newStatus}`);
  };

  const resetBoard = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the entire board?"
    );

    if (!confirmReset) return;

    setTasks([]);
    setLogs([]);
    localStorage.removeItem("tasks");
    localStorage.removeItem("logs");
  };

  const processedTasks = useMemo(() => {
    let filtered = [...tasks];

    if (search) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priorityFilter !== "All") {
      filtered = filtered.filter(
        (task) => task.priority === priorityFilter
      );
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }

    return filtered;
  }, [tasks, search, priorityFilter, sortOrder]);

  const todoTasks = processedTasks.filter((task) => task.status === "Todo");
  const doingTasks = processedTasks.filter((task) => task.status === "Doing");
  const doneTasks = processedTasks.filter((task) => task.status === "Done");

  return (
    <div style={{ padding: "20px" }}>
      <div style={styles.header}>
        <h1>Task Board</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={resetBoard} style={{ fontSize: "25px", background: "red", color: "white",border: "none", padding: "10px 12px", borderRadius: "10px", cursor: "pointer" }}>
            Reset Board
          </button>
          <button onClick={handleLogout} style={{fontSize: "25px", background:"Pink", color: "Black", border: "none", padding: "10px 12px", borderRadius: "10px", cursor: "pointer" }}>Logout</button>
        </div>
      </div>

      <TaskForm style={{ marginLeft: "20px",background: "lightblue" }}
        addTask={addTask}
        editingTask={editingTask}
        updateTask={updateTask}
      />

      <div style={styles.controls}>
        <input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">No Sorting</option>
          <option value="asc">Sort by Due Date</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <DndContext onDragEnd={handleDragEnd}>
          <div style={styles.board}>
            <Column title="Todo" tasks={todoTasks} deleteTask={deleteTask} editTask={editTask} />
            <Column title="Doing" tasks={doingTasks} deleteTask={deleteTask} editTask={editTask} />
            <Column title="Done" tasks={doneTasks} deleteTask={deleteTask} editTask={editTask} />
          </div>
        </DndContext>

        <ActivityLog logs={logs} />
      </div>
    </div>
  );
}

const styles = {

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  board: {
    display: "flex",
    gap: "20px",
  },
  controls: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    fontSize: "20px",
    gap: "25px",
    marginBottom: "20px",
  },
};
