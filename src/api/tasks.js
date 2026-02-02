import client from "./client";

// GET /api/projects/:projectId/tasks
// Fetch all tasks for a specific project
// projectId is the ID of the project
export async function getTasksByProject(projectId) {
  const res = await client.get(`/api/projects/${projectId}/tasks`);
  return res.data;
}

// POST /api/projects/:projectId/tasks
// Create a new task within a specific project
// projectId is the ID of the project
export async function createTask(projectId, payload) {
  const res = await client.post(`/api/projects/${projectId}/tasks`, payload);
  return res.data;
}

// PUT /api/projects/:projectId/tasks/:taskId
// Update a specific task within a project
// projectId is the ID of the project
// taskId is the ID of the task to update
export async function updateTask(projectId, taskId, payload) {
  const res = await client.put(`/api/projects/${projectId}/tasks/${taskId}`, payload);
  return res.data;
}

// DELETE /api/projects/:projectId/tasks/:taskId
// Delete a specific task within a project
// projectId is the ID of the project
// taskId is the ID of the task to delete
export async function deleteTask(projectId, taskId) {
  const res = await client.delete(`/api/projects/${projectId}/tasks/${taskId}`);
  return res.data;
}
