import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ task, deleteTask, editTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={{ ...styles.card, ...style }}>
      <div style={styles.dragHandle} {...listeners} {...attributes}>
        ⠿ Drag
      </div>

      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Due:</strong> {task.dueDate || "No due date"}</p>

      <div style={styles.buttons}>
        <button onClick={() => editTask(task)}>Edit</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default function Column({ title, tasks, deleteTask, editTask }) {
  const { setNodeRef, isOver } = useDroppable({
    id: title, 
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        ...styles.column,
        backgroundColor: isOver ? "#e3f2fd" : "#f4f4f4",
      }}
    >
      <h2>{title}</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

const styles = {
  column: {
    padding: "15px",
    borderRadius: "8px",
    width: "300px",
    minHeight: "400px", // IMPORTANT
  },
  card: {
    background: "#fff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  dragHandle: {
    cursor: "grab",
    fontSize: "12px",
    color: "#555",
    marginBottom: "5px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
};
