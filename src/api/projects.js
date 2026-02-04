import api from "./client";

// Get all projects for logged-in user
export async function getMyProjects() {
  const res = await api.get("/api/projects");
  return res.data;
}

// Create new project
export async function createProject(payload) {
  const res = await api.post("/api/projects", payload);
  return res.data;
}

// Delete a project
export async function deleteProject(projectId) {
  const res = await api.delete(`/api/projects/${projectId}`);
  return res.data;
}

//Get one project
export async function getProjectById(projectId) {
  const res = await api.get(`/api/projects/${projectId}`);
  return res.data;
}

//UPDATE project (priority, name, dueDate, etc.)
export async function updateProject(id, updates) {
  const res = await api.put(`/api/projects/${id}`, updates);
  return res.data;
}
