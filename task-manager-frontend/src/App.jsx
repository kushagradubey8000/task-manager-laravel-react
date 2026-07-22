import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: "",
  });
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const filters = statusFilter ? { status: statusFilter } : {};
      const data = await getTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(form);
      setForm({ title: "", description: "", status: "pending", priority: "medium", due_date: "" });
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleComplete = async (task) => {
    const nextStatus = task.status === "completed" ? "pending" : "completed";
    await updateTask(task.id, { status: nextStatus });
    loadTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Task Manager</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
        />
        <button type="submit">Add Task</button>
      </form>

      <div style={{ marginBottom: 16 }}>
        Filter by status:{" "}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 6,
              padding: 10,
              marginBottom: 8,
              textDecoration: task.status === "completed" ? "line-through" : "none",
            }}
          >
            <strong>{task.title}</strong> ({task.priority}) — {task.status}
            <div>{task.description}</div>
            <button onClick={() => toggleComplete(task)}>
              {task.status === "completed" ? "Mark Pending" : "Mark Complete"}
            </button>
            <button onClick={() => removeTask(task.id)} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
