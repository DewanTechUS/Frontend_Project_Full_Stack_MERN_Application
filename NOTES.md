# `frontend/NOTES.md`

````md
# Frontend Development Notes

This document explains design decisions and implementation details for the Pro-Tasker frontend.

---

## API Architecture

All API logic is centralized in the `src/api` folder:

- `client.js` — Axios instance with base URL and JWT interceptor
- `auth.js` — Authentication-related API calls
- `projects.js` — Project CRUD operations
- `tasks.js` — Task CRUD operations within projects

This keeps components clean and avoids duplicated request logic.

---

## Axios Token Handling

JWT tokens are stored in `localStorage`.

Axios automatically attaches the token to every request using an interceptor:

```js

```

## Authorization: Bearer <token>

This ensures protected backend routes work without manual headers.

Environment Variables

## The frontend relies on Vite environment variables:

- Variables must start with VITE\_
- Values are read using import.meta.env

## If .env is missing:

- API requests fail
- Authentication breaks
- Dashboard cannot load data

Routing Strategy

- Public routes: Login, Register
- Protected routes: Dashboard, Project Details
- Access is enforced using a ProtectedRoute component

State Management

- Local component state: useState
- Global auth state: Context API
- JWT persistence via localStorage

UI & UX Decisions

- Simple, readable layout
- Clear error handling
- Loading states for async operations
- Mobile-friendly responsive design

Future Improvements

- Pagination for projects and tasks
- Optimistic UI for more actions
- Better error boundary handling
- UI animations


