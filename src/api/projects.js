import client from "./client";
// Project API functions // for managing projects
// Fetch all projects for the logged-in user
// GET /api/projects
// returns array of projects
// each project contains id, name, description, etc.
// use authentication token in headers
export async function getProjects() {
  const res = await client.get("/api/projects");
  return res.data;
}
// Create a new project
// POST /api/projects
// payload should contain project detailsq
// like name, description, etc.
export async function createProject(payload) {
  const res = await client.post("/api/projects", payload);
  return res.data;
}
// Fetch a single project by ID
// GET /api/projects/:id
// id is the project ID
// returns project details
export async function getProjectById(id) {
  const res = await client.get(`/api/projects/${id}`);
  return res.data;
}
