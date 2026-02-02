import client from "./client";
// Task API functions // for managing tasks within projects
// Fetch all tasks for a specific project
// GET /api/projects/:projectId/tasks
// projectId is the ID of the project
// returns array of tasks for the project
export async function getTasksByProject(projectId) {
  const res = await client.get(`/api/projects/${projectId}/tasks`);
  return res.data;
}
// Create a new task within a specific project
// POST /api/projects/:projectId/tasks
// projectId is the ID of the project
// payload should contain task details like title, description, status, etc.
export async function createTask(projectId, payload) {
  const res = await client.post(`/api/projects/${projectId}/tasks`, payload);
  return res.data;
}
// Update an existing task within a specific project
// PUT /api/projects/:projectId/tasks/:taskId
// projectId is the ID of the project
// taskId is the ID of the task to update
// payload should contain updated task details
export async function updateTask(projectId, taskId, payload) {
  const res = await client.put(`/api/projects/${projectId}/tasks/${taskId}`, payload);
  return res.data;
}
// Delete a task within a specific project
// DELETE /api/projects/:projectId/tasks/:taskId
// projectId is the ID of the project
// taskId is the ID of the task to delete
export async function deleteTask(projectId, taskId) {
  const res = await client.delete(`/api/projects/${projectId}/tasks/${taskId}`);
  return res.data;
}
