# Pro-Tasker Frontend API

## Author

**Dewan Mahmud (Rocky)**  
Frontend / Full-Stack Software Engineer | MERN Stack  
REST APIs • JWT Authentication • MongoDB • Express

Website: https://dewantech.com  
GitHub: https://github.com/DewanTechUS/Backend_Project_Full_Stack_MERN_Application  
LinkedIn: https://www.linkedin.com/in/dewan-mahmud-a579a0265/  
Live Frontend (Render): https://frontend-project-full-stack-mern.onrender.com

## **Overview**

The **Pro-Tasker Frontend** is a single-page application built with **React** and **Vite**.

It provides the user interface for **authentication**, **project management**, and **task management**.

The frontend communicates with the **Pro-Tasker Backend API** using **Axios** and **JWT-based authentication**.

All API configuration and environment-specific values are handled using **environment variables**.

This frontend is designed to work together with the **Pro-Tasker Backend API** and demonstrates real-world frontend engineering practices such as **protected routes**, **global authentication state**, and **API integration**.

## **Features**

- **User registration and login**
- **JWT authentication** with token persistence
- **Automatic token attachment** to API requests
- **Protected routes** using React Router
- **Project creation, viewing, updating, and deletion**
- **Task creation, updating, completion tracking, and deletion**
- **Global authentication state** using React Context API
- **Responsive UI** for desktop and mobile
- **Environment-based configuration** using `.env`

## **Technology Stack**

- **React**
- **Vite**
- **Axios**
- **React Router DOM**
- **Context API**
- **CSS**

## **Environment Variables Setup (.env)**

This frontend requires a **.env** file to run correctly.

Without it, the frontend will not know how to connect to the **backend API**.

## **Where the .env File Goes**

Create the **.env** file inside the **frontend/Root** folder, at the following path:

**frontend/root/.env**

## **Important Notes**

- The file name must be exactly **.env**
- Do **not** commit the **.env** file to GitHub
- **Restart the development server** after editing **.env**

## **Required .env Variables**

Add the following variables to **frontend/root/.env**:

```env
VITE_API_URL=http://localhost:3000
VITE_CLIENT_ORIGIN=http://localhost:3001
BASE_URL=http://localhost:3000
```

## **What Each Variable Does**

### **VITE_API_URL**

- **Base URL of the backend API**
- **Used by Axios** in `src/api/client.js`
- **All API requests are sent to:**
- **VITE_API_URL + /api/...**
- **Example:**
- `http://localhost:3000/api/projects`

### **VITE_CLIENT_ORIGIN**

- **URL where the frontend runs locally**
- **Must match** the backend **CLIENT_ORIGIN** value for CORS to work correctly

### **BASE_URL**

- **Shared or fallback reference to the backend**
- **In this project, it matches** `VITE_API_URL`
- **Can be removed** if not referenced elsewhere in the code

## **How the Frontend Connects to the Backend**

The frontend uses **Axios** with a shared API client.

- **File:** `src/api/client.js`
- **The Axios base URL is read from:**
- `import.meta.env.VITE_API_URL`
- A **JWT token** is automatically attached to every request using **Axios request interceptors**

This allows all **authenticated API requests** to work without manually adding headers in each call.

## **Local Development Setup**

### **Step 1: Install Dependencies**

From the **frontend** folder, run:

```bash
npm install react react-dom react-router-dom axios
```

### **Step 2: Start the Development Server**

```bash
npm run dev
```

Vite will display the local development URL, typically:
http://localhost:3001
Open the browser and navigate to that address.

## **Backend Requirement**

The backend must be running before using the frontend.

- **Expected backend URL:**
- `http://localhost:3000`

- **Health check endpoint:**
- `GET http://localhost:3000/health`

If the backend is not running, **API requests from the frontend will fail**.

## **Authentication Flow**

1. **User registers or logs in** from the frontend
2. **Backend returns a JWT token**
3. **Token is stored** in `localStorage`
4. **Axios automatically sends the token** in the `Authorization` header
5. **Protected routes and API requests** become accessible

---

## **Common Errors and Fixes**

### **ECONNREFUSED or Proxy Error**

**Cause:**

- **Backend is not running**
- **VITE_API_URL is incorrect**

**Fix:**

- **Start the backend server**
- **Verify the .env file**
- **Restart the frontend development server**

---

### **CORS Error**

**Cause:**

- **Backend `CLIENT_ORIGIN` does not match the frontend URL**

**Fix:**

Set the following in the backend **.env** file:

```env
CLIENT_ORIGIN=http://localhost:3001
```

## **Available Scripts**

- **npm run dev** — Start development server
- **npm run build** — Build production assets
- **npm run preview** — Preview production build locally

## **Reflection**

Building the **Pro-Tasker Frontend** strengthened my understanding of modern frontend development using **React**. I gained hands-on experience managing **global authentication state** with the Context API, protecting routes with **React Router**, and integrating a frontend application with a **secure backend API** using **Axios** and **JWTs**.

One of the most valuable lessons from this project was handling **real-world authentication flows**, including token storage, automatic token attachment, and conditional rendering based on authentication state. I also improved my ability to structure a React application using **reusable components** and a clean **separation of concerns**.

This project helped me connect **backend and frontend concepts** into a complete, functional application and reinforced best practices for **environment-based configuration** and **deployment readiness**.  
To assist with live demos and deployment debugging (such as on **Render**), I have included screenshots, as React applications can be very helpful for debugging but may also present deployment-specific challenges.

## **Special Thanks**

Special thanks to my **instructors**, **mentors**, and **fellow learners** in my **Per Scholas cohort** for their guidance, feedback, and support throughout this project. Their instruction and encouragement played an important role in the successful completion of this application.
