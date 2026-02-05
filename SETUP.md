# Frontend Setup Guide

This document explains how to run the **Pro-Tasker frontend** locally.

---

## Prerequisites

- Node.js (v18 or later)
- npm
- Backend API running locally or deployed

---

## Installation Steps

### 1. Navigate to the frontend folder

From the project, run:

```bash

```

## cd frontend_or_root

2. Install dependencies
   npm install
3. Create the .env file

- Create a file named .env at the following path:

- frontend_or_root /.env

4. Add required environment variables
   VITE_API_URL=http://localhost:3000
   VITE_CLIENT_ORIGIN=http://localhost:3001
   BASE_URL=http://localhost:3000
5. Start the frontend
   npm run dev

## Verification

- Open your browser
- Navigate to: http://localhost:3001
- Register a new user
- Log in
- Create a project
