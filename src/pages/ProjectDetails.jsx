import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, deleteProject } from "../api/projects";
import {
  createTask,
  deleteTask,
  getTasksByProject,
  updateTask,
} from "../api/tasks";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  // create task fields
  const [title, setTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");

  // task note (create)
  const [note, setNote] = useState("");

  // edit task fields
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("medium");

  // task note (edit)
  const [editNote, setEditNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // failsafe state to prevent double-click / repeated delete-all
  const [deletingAll, setDeletingAll] = useState(false);

  // typed confirmation input (used in delete-all modal)
  const [confirmText, setConfirmText] = useState("");

  // modal open/close for delete-all confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Delete Project modal + 2-step failsafe
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [deleteProjectStep, setDeleteProjectStep] = useState(1); // 1 -> 2
  const [deleteProjectText, setDeleteProjectText] = useState("");
  const [deletingProject, setDeletingProject] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const p = await getProjectById(projectId);
      setProject(p);

      const t = await getTasksByProject(projectId);
      setTasks(Array.isArray(t) ? t : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load project");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [projectId]);

  async function handleAddTask(e) {
    e.preventDefault();
    setError("");
    try {
      await createTask(projectId, { title, priority: taskPriority, note });
      setTitle("");
      setTaskPriority("medium");
      setNote("");
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create task");
    }
  }

  async function handleToggle(task) {
    setError("");

    //Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      await updateTask(projectId, task._id, { completed: !task.completed });
    } catch (err) {
      // rollback
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, completed: task.completed } : t
        )
      );
      setError(err?.response?.data?.message || "Failed to update task");
    }
  }

  async function handleDelete(task) {
    setError("");
    try {
      await deleteTask(projectId, task._id);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete task");
    }
  }

  // Delete ALL tasks with MODAL failsafe + double confirmation
  async function handleDeleteAllTasks() {
    if (tasks.length === 0 || deletingAll) return;

    // 1) typed YES inside modal
    if (confirmText !== "YES") {
      alert("Please type YES (all caps) to confirm.");
      return;
    }

    // 2) second confirmation dialog
    const secondConfirm = window.confirm(
      "⚠️ Are you ABSOLUTELY sure? This will permanently delete ALL tasks."
    );
    if (!secondConfirm) return;

    // 3) final typed confirmation (prompt)
    const finalConfirm = window.prompt(
      "Type YES again (ALL CAPS) to permanently delete all tasks:"
    );
    if (finalConfirm !== "YES") {
      alert("Final confirmation failed. Tasks were NOT deleted.");
      return;
    }

    setDeletingAll(true);
    setError("");

    try {
      await Promise.all(tasks.map((task) => deleteTask(projectId, task._id)));
      setConfirmText("");
      setShowDeleteModal(false);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete all tasks");
    } finally {
      setDeletingAll(false);
    }
  }

  function startEdit(task) {
    setEditingTaskId(task._id);
    setEditTitle(task.title || "");
    setEditPriority(task.priority || "medium");
    setEditNote(task.note || "");
  }

  function cancelEdit() {
    setEditingTaskId(null);
    setEditTitle("");
    setEditPriority("medium");
    setEditNote("");
  }

  async function saveEdit(taskId) {
    setError("");
    try {
      await updateTask(projectId, taskId, {
        title: editTitle,
        priority: editPriority,
        note: editNote,
      });
      cancelEdit();
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update task");
    }
  }

  function closeDeleteModal() {
    setShowDeleteModal(false);
    setConfirmText("");
  }

  function closeDeleteProjectModal() {
    setShowDeleteProjectModal(false);
    setDeleteProjectStep(1);
    setDeleteProjectText("");
  }

  async function handleDeleteProjectConfirmed() {
    if (!projectId || deletingProject) return;

    // Step 1: type DELETE
    if (deleteProjectStep === 1) {
      if (deleteProjectText !== "DELETE") {
        alert("Please type DELETE (all caps) to continue.");
        return;
      }
      setDeleteProjectStep(2);
      setDeleteProjectText("");
      return;
    }

    // Step 2: type DELETE again
    if (deleteProjectStep === 2) {
      if (deleteProjectText !== "DELETE") {
        alert("Final confirmation failed. Project was NOT deleted.");
        return;
      }
    }

    setDeletingProject(true);
    setError("");

    try {
      await deleteProject(projectId);
      closeDeleteProjectModal();
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete project");
    } finally {
      setDeletingProject(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="page-error">{error}</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <section className="project-details">
     <div className="project-header">
  {/*  Mobile/Desktop action row */}
  <div className="project-actions-row">
    <button
      type="button"
      className="project-back-btn"
      onClick={() => navigate("/dashboard")}
    >
    Dashboard
    </button>

    <button
      type="button"
      className="project-delete-btn"
      onClick={() => setShowDeleteProjectModal(true)}
    >
      Delete Project
    </button>
  </div>

  <h2>{project.name}</h2>

  <p className="project-task-count">
    Completed {tasks.filter((t) => t.completed).length} / {tasks.length}
  </p>

  <p className="project-subtitle">{project.description || "No description"}</p>
</div>

      <form onSubmit={handleAddTask} className="task-form">
        <input
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="task-input"
        />

        <input
          placeholder="Task Note (details, links, reminders...)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="task-input"
        />

        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className="task-input task-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="task-btn">Add Task</button>

        {/* stays next to Add Task */}
        <button
          type="button"
          className="task-delete-all"
          onClick={() => setShowDeleteModal(true)}
          disabled={tasks.length === 0 || deletingAll}
          title={tasks.length === 0 ? "No tasks to delete" : "Delete all tasks"}
        >
          {deletingAll ? "Deleting..." : "Delete All Tasks"}
        </button>
      </form>

      {/* MODAL: Delete ALL tasks */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) closeDeleteModal();
          }}
        >
          <div className="modal-card" role="dialog" aria-modal="true">
            <h3 className="modal-title">Delete ALL Tasks?</h3>
            <p className="modal-text">
              This will permanently delete every task in this project. This
              cannot be undone.
            </p>

            <input
              type="text"
              placeholder="Type YES to enable delete"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="task-input"
              autoFocus
            />

            <div className="modal-actions">
              <button
                type="button"
                className="task-delete"
                onClick={closeDeleteModal}
                disabled={deletingAll}
              >
                Cancel
              </button>

              <button
                type="button"
                className="task-delete-all"
                onClick={handleDeleteAllTasks}
                disabled={deletingAll || confirmText !== "YES"}
              >
                {deletingAll ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Delete Project (I added 2-step failsafe) */}
      {showDeleteProjectModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay"))
              closeDeleteProjectModal();
          }}
        >
          <div className="modal-card" role="dialog" aria-modal="true">
            <h3 className="modal-title">
              {deleteProjectStep === 1 ? "Delete Project?" : "Final Confirmation"}
            </h3>

            <p className="modal-text">
              ⚠️ Are you sure you want to delete this project? This cannot be
              undone. You will lose the project and all tasks inside it.
            </p>

            <p className="modal-text" style={{ marginTop: 10 }}>
              {deleteProjectStep === 1
                ? "Step 1 of 2: Type DELETE to continue."
                : "Step 2 of 2: Type DELETE again to permanently delete the project."}
            </p>

            <input
              type="text"
              placeholder="Type DELETE"
              value={deleteProjectText}
              onChange={(e) => setDeleteProjectText(e.target.value)}
              className="task-input"
              autoFocus
            />

            <div className="modal-actions">
              <button
                type="button"
                className="task-delete"
                onClick={closeDeleteProjectModal}
                disabled={deletingProject}
              >
                Cancel
              </button>

              <button
                type="button"
                className="task-delete-all"
                onClick={handleDeleteProjectConfirmed}
                disabled={deletingProject || deleteProjectText !== "DELETE"}
              >
                {deletingProject
                  ? "Deleting..."
                  : deleteProjectStep === 1
                  ? "Continue"
                  : "Delete Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <div className="task-list">
          {tasks.map((t) => {
            const isEditing = editingTaskId === t._id;

            return (
              <div key={t._id} className="task-row">
                <div className="task-left">
                  <label className="task-complete">
                    <input
                      type="checkbox"
                      checked={!!t.completed}
                      onChange={() => handleToggle(t)}
                    />
                    <span className="task-complete-text">Complete</span>
                  </label>

                  {isEditing ? (
                    <div className="task-edit-wrap">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="task-input task-edit-input"
                      />

                      <input
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        placeholder="Edit note (optional)"
                        className="task-input"
                      />

                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="task-input task-select"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  ) : (
                    <div className="task-text">
                      <span
                        className={`task-title ${
                          t.completed ? "completed" : ""
                        }`}
                      >
                        {t.title}{" "}
                        <span className="task-priority">
                          ({t.priority || "medium"})
                        </span>
                      </span>

                      {t.note && <div className="task-note">{t.note}</div>}
                    </div>
                  )}
                </div>

                <div className="task-actions">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="task-btn"
                        onClick={() => saveEdit(t._id)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="task-delete"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="task-btn"
                        onClick={() => startEdit(t)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="task-delete"
                        onClick={() => handleDelete(t)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
