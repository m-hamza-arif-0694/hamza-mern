# 🎓 Full-Stack Student Management Application (React + Express + MongoDB + JWT Auth) — HisabDo MERN Internship (Day 7)

Welcome to Day 7 of the **HisabDo MERN Stack Internship Program**. This project is a complete production-grade Full-Stack MERN application connecting a modern **React frontend (Vite)** with a secure **Node.js / Express REST API backend**, **MongoDB & Mongoose database persistence**, and **JWT Authentication**.

---

## 🎯 Tech Stack & Tools

* **Frontend:** React 18, Vite 5, Lucide-React Icons, Context API State Management, Vanilla CSS (Dark Mode Glassmorphism UI)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Local MongoDB Community Server / Cloud MongoDB Atlas)
* **ODM:** Mongoose Object Data Modeling
* **Authentication:** JWT (`jsonwebtoken`) Bearer Token Security & `bcryptjs` Password Hashing
* **Testing:** Automated integration test suite (`mongodb-memory-server`) & Postman Collection v2.1

---

## 📁 Project Structure

```
Day 7/
├── backend/                      # Express REST API Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js             # Mongoose DB connection with auto-fallback
│   │   ├── models/
│   │   │   ├── User.js           # User schema (bcrypt hashing, JWT signing)
│   │   │   └── Student.js        # Student schema (validation rules)
│   │   ├── middleware/
│   │   │   ├── auth.js           # JWT Bearer token protection middleware
│   │   │   ├── validation.js     # Request input & ObjectId validators
│   │   │   └── errorHandler.js   # 404 Route Not Found & 500 error handler
│   │   ├── controllers/
│   │   │   ├── authController.js # Register, Login, & Profile controllers
│   │   │   └── studentController.js # Protected Student CRUD controllers
│   │   ├── routes/
│   │   │   ├── authRoutes.js     # /api/auth routes
│   │   │   └── studentRoutes.js  # /api/students protected routes
│   │   ├── app.js                # Express application configuration
│   │   └── server.js             # Server entry point (Port 5000)
│   ├── test-api.js               # Automated integration test runner
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/                     # React Vite Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar with user badge & logout
│   │   │   ├── AuthForm.jsx      # Login & Register views
│   │   │   ├── StatsHeader.jsx   # Overview statistics header
│   │   │   ├── StudentCard.jsx   # Student details & actions
│   │   │   ├── StudentList.jsx   # Search, filters, grid & empty state
│   │   │   └── StudentFormModal.jsx # Add/Edit modal form
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication context & localStorage state
│   │   ├── services/
│   │   │   └── api.js            # API client with automatic Bearer token injection
│   │   ├── App.jsx
│   │   ├── App.css               # Glassmorphic dark design system
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── postman/                      # Postman Collection Export
│   └── HisabDo_Day7_FullStack_API.postman_collection.json
├── screenshots/                  # Full-Stack Application Screenshots
├── package.json                  # Root helper scripts
└── README.md
```

---

## 🚀 Installation & Setup Guide

### 1. Prerequisites
- **Node.js** (v14+ recommended)
- **MongoDB** (Local MongoDB Server on `mongodb://127.0.0.1:27017` or MongoMemoryServer fallback)

---

### 2. Backend Setup & Run

1. Navigate to the `backend` folder:
   ```bash
   cd Day 7/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/hisabdo_day7_fullstack_db
   JWT_SECRET=hisabdo_day7_jwt_secret_key_fullstack_2026
   JWT_EXPIRE=30d
   ```
4. Start backend server:
   ```bash
   npm run dev
   ```
   *The backend server starts on `http://localhost:5000`.*

---

### 3. Frontend Setup & Run

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd Day 7/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start React application:
   ```bash
   npm run dev
   ```
   *The React app starts on `http://localhost:5173`.*

---

## 🧪 Running Automated Backend Tests

To execute full integration tests covering User Registration, Login, JWT verification, and Protected Student CRUD operations:

```bash
cd Day 7/backend
npm test
```

> 💡 **Zero Setup:** Uses `mongodb-memory-server` to run tests out-of-the-box without requiring a running local MongoDB daemon!

---

## 🔐 Available Features & Functional Highlights

### 1️⃣ Authentication & Authorization
- **User Registration & Login**: Creates user accounts with `bcryptjs` password hashing and returns JWT tokens.
- **Persistent Auth State**: JWT token stored securely in `localStorage` and automatically restored on page refresh.
- **Protected Routing**: Unauthenticated users are shown the Auth screen. Authenticated users access the Student Dashboard.
- **Logout Action**: Clears token and resets app state securely.

### 2️⃣ Student Management CRUD (Protected APIs)
- 1️⃣ **Fetch Students**: Fetches student records from `GET /api/students`.
- 2️⃣ **Display Students**: Renders students in a responsive glassmorphic grid with grade badges.
- 3️⃣ **Add Student**: Create new students via `POST /api/students`.
- 4️⃣ **Update Student**: Edit existing records via `PUT /api/students/:id`.
- 5️⃣ **Delete Student**: Delete records via `DELETE /api/students/:id`.
- 6️⃣ **Search Students**: Real-time search filtering by name, email, or course via `GET /api/students?search=...`.
- 7️⃣ **Loading State**: Animated spinners for initial fetch and modal submissions.
- 8️⃣ **Error Handling**: Graceful error alert banners for network failures or validation errors.

---

## 📌 API Endpoints Overview

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Register user & return JWT token |
| **POST** | `/api/auth/login` | Public | Login user & return JWT token |
| **GET** | `/api/auth/me` | Protected (JWT) | Get authenticated user profile |
| **GET** | `/api/students` | Protected (JWT) | Get all students (supports `?search=`) |
| **GET** | `/api/students/:id` | Protected (JWT) | Get student by MongoDB ObjectId |
| **POST** | `/api/students` | Protected (JWT) | Create a new student record |
| **PUT** | `/api/students/:id` | Protected (JWT) | Update student record by ID |
| **DELETE** | `/api/students/:id` | Protected (JWT) | Delete student record by ID |

---

## 📧 Submission Info

Submitted to: `hisabdo.app@gmail.com`  
Program: **HisabDo MERN Stack Internship Program (Day 7)**
