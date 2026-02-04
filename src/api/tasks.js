import api from "./client";
// CRUD operations for tasks within projects
// Get all tasks for a specific project
export async function getTasksByProject(projectId) {
  const res = await api.get(`/api/projects/${projectId}/tasks`);
  return res.data;
}
// Create a new task in a specific project
export async function createTask(projectId, payload) {
  const res = await api.post(`/api/projects/${projectId}/tasks`, payload);
  return res.data;
}
// Update a task in a specific project
export async function updateTask(projectId, taskId, payload) {
  const res = await api.put(`/api/projects/${projectId}/tasks/${taskId}`, payload);
  return res.data;
}
// Delete a task from a specific project
export async function deleteTask(projectId, taskId) {
  const res = await api.delete(`/api/projects/${projectId}/tasks/${taskId}`);
  return res.data;
}
