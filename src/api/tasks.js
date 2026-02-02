import client from "./client";

// GET /api/projects/:projectId/tasks
export async function getTasksByProject(projectId) {
  const res = await client.get(`/api/projects/${projectId}/tasks`);
  return res.data;
}

// POST /api/projects/:projectId/tasks
export async function createTask(projectId, payload) {
  const res = await client.post(`/api/projects/${projectId}/tasks`, payload);
  return res.data;
}

// PUT /api/projects/:projectId/tasks/:taskId
export async function updateTask(projectId, taskId, payload) {
  const res = await client.put(`/api/projects/${projectId}/tasks/${taskId}`, payload);
  return res.data;
}

// DELETE /api/projects/:projectId/tasks/:taskId
export async function deleteTask(projectId, taskId) {
  const res = await client.delete(`/api/projects/${projectId}/tasks/${taskId}`);
  return res.data;
}
