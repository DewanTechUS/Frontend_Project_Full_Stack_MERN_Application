import { useEffect, useState } from "react";
import { createProject, deleteProject, getMyProjects } from "../api/projects";
import { Link } from "react-router-dom";

// Helper formatter functions // date only
function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString();
}
// Helper formatter functions // datetime
function fmtDateTime(d) {
  if (!d) return "—";
  return new Date(d).toLocaleString();
}

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  // NEW: due date state
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
// Load projects from API
  async function loadProjects() {
    setLoading(true);
    setError("");
    try {
      const data = await getMyProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }
// Load projects on mount // it will run only once
  useEffect(() => {
    loadProjects();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    try {
      // NEW: Send dueDate too
      await createProject({ name, description, priority, dueDate });

      setName("");
      setDescription("");
      setPriority("medium");
      setDueDate(""); // NEW: Reset after create

      await loadProjects();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create project");
    }
  }

  async function handleDeleteProject(projectId, projectName) {
    const ok = window.confirm(
      `Delete project "${projectName}"? This cannot be undone.`
    );
    if (!ok) return;

    setError("");
    try {
      await deleteProject(projectId);
      await loadProjects();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete project");
    }
  }

  return (
    <section className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      <form onSubmit={handleCreate} className="dashboard-form card">
        <input
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="dashboard-input"
        />

        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="dashboard-input"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="dashboard-input dashboard-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Date picker added after priority */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="dashboard-input"
        />

        <button className="dashboard-btn">Add Project</button>
      </form>

      {error && <p className="dashboard-error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects yet. Create your first one above.</p>
      ) : (
        <div className="dashboard-list">
          {projects.map((p) => (
            <div key={p._id} className="dashboard-card">
              <div className="dashboard-card-left">
                <h3 className="dashboard-card-title">{p.name}</h3>

                <p className="dashboard-card-subtitle">
                  {(p.description || "No description")} •{" "}
                  <span className="dashboard-priority">
                    {p.priority || "medium"}
                  </span>
                  {p.dueDate ? (
                    <>
                      {" "}
                      •{" "}
                      <span className="dashboard-duedate">
                        Due: {new Date(p.dueDate).toLocaleDateString()}
                      </span>
                    </>
                  ) : null}
                </p>

                {/* Show created time + due date */}
                <p className="dashboard-card-date">
                  Due: {fmtDate(p.dueDate)} • Created: {fmtDateTime(p.createdAt)}
                </p>
              </div>

              <div className="dashboard-card-actions">
                <Link to={`/projects/${p._id}`} className="dashboard-open-link">
                  Open Project
                </Link>
                
{/*  Dashboard delete removed – delete is handled inside ProjectDetails */}
                {/* <button
                  type="button"
                  className="dashboard-del-btn"
                  onClick={() => handleDeleteProject(p._id, p.name)}
                >
                  Delete
                </button> */} 
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
