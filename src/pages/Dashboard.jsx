import { useEffect, useState } from "react";
import {
  createProject,
  deleteProject,
  getMyProjects,
  updateProject,
} from "../api/projects";
import { Link } from "react-router-dom";

/* Date helpers */
function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString();
}

function fmtDateTime(d) {
  if (!d) return "—";
  return new Date(d).toLocaleString();
}

/* Priority cycle helper */
function nextPriority(current = "medium") {
  if (current === "low") return "medium";
  if (current === "medium") return "high";
  return "low";
}

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Load projects */
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

  useEffect(() => {
    loadProjects();
  }, []);

  /* Create project */
  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    try {
      await createProject({ name, description, priority, dueDate });

      setName("");
      setDescription("");
      setPriority("medium");
      setDueDate("");

      await loadProjects();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create project");
    }
  }

  /* Delete project (unused here) */
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
      <h2 className="dashboard-title">Project Dashboard</h2>

      {/* Create Project Form */}
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

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="dashboard-input"
        />

        <button className="dashboard-btn">Add Project</button>
      </form>

      {error && <p className="dashboard-error">{error}</p>}

      {/* Project List */}
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
                 <span
  className={`dashboard-priority priority-${p.priority || "medium"}`}
>
  {p.priority || "medium"}
</span>

                  {p.dueDate && (
                    <>
                      {" "}
                      •{" "}
                      <span className="dashboard-duedate">
                        Due: {fmtDate(p.dueDate)}
                      </span>
                    </>
                  )}
                </p>

                <p className="dashboard-card-date">
                  Due: {fmtDate(p.dueDate)} • Created:{" "}
                  {fmtDateTime(p.createdAt)}
                </p>
              </div>

              {/* Actions */}
              <div className="dashboard-card-actions">
                <Link to={`/projects/${p._id}`} className="dashboard-open-link">
                  Open Project
                </Link>

                {/* PRIORITY EDIT BUTTON */}
                <button
  type="button"
  className={`pill-btn priority-btn priority-${p.priority || "medium"}`}
  onClick={async () => {
    await updateProject(p._id, {
      priority: nextPriority(p.priority),
    });
    loadProjects();
  }}
>
  {(p.priority || "medium").toptobaseCase?.() ?? (p.priority || "medium").toUpperCase()}
</button>

                {/* Delete intentionally handled in ProjectDetails */}
                {/*
                <button
                  type="button"
                  className="dashboard-del-btn"
                  onClick={() => handleDeleteProject(p._id, p.name)}
                >
                  Delete
                </button>
                */}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
