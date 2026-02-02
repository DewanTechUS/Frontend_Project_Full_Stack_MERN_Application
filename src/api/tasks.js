import client from "./client";

// Task API functions // for managing tasks within projects
// Fetch all tasks for a specific project
// GET /api/projects/:projectId/tasks
// projectId is the ID of the project
// returns array of tasks for the project
// use authentication token in headers

export async function getTasksByProject(projectId) {
  const res = await client.get(`/api/projects/${projectId}/tasks`);
  return res.data;
}
// payload should contain task details like title, description, status, etc.
// Update an existing task
// PUT /api/tasks/:taskId
// taskId is the ID of the task to update
export async function createTask(projectId, payload) {
  const res = await client.post(`/api/projects/${projectId}/tasks`, payload);
  return res.data;
}
// Update an existing task
// PUT /api/tasks/:taskId
// taskId is the ID of the task to update
// payload should contain updated task details
export async function updateTask(taskId, payload) {
  const res = await client.put(`/api/tasks/${taskId}`, payload);
  return res.data;
}
// Delete a task
// DELETE /api/tasks/:taskId
// taskId is the ID of the task to delete
export async function deleteTask(taskId) {
  const res = await client.delete(`/api/tasks/${taskId}`);
  return res.data;
}
//