# 📚 Student Management System REST API (MongoDB + Mongoose) — HisabDo MERN Internship (Day 5)

Welcome to Day 5 of the **HisabDo MERN Stack Internship Program**. This repository contains a production-ready Node.js + Express REST API integrated with **MongoDB database persistence using Mongoose**. It replaces temporary in-memory arrays with persistent database documents, featuring schema validation, custom middleware, clean controller-route architecture, and comprehensive HTTP error handling.

---

## 🎯 Tech Stack & Tools

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Local / Cloud MongoDB Atlas)
* **ODM:** Mongoose Object Data Modeling
* **Environment Config:** dotenv
* **Testing Tools:** Automated test suite (`mongodb-memory-server`) / Postman / Thunder Client

---

## 📁 Project Structure

```
Day 5/
├── src/
│   ├── config/
│   │   └── db.js              # Mongoose database connection module
│   ├── models/
│   │   └── Student.js         # Mongoose schema and model definition
│   ├── controllers/
│   │   └── studentController.js # Async controller logic for MongoDB CRUD operations
│   ├── middleware/
│   │   ├── validation.js      # Input validation & MongoDB ObjectId checker
│   │   └── errorHandler.js    # 404 Route Not Found & 500 Global error handler
│   ├── routes/
│   │   └── studentRoutes.js   # Express router mapping /students endpoints
│   ├── app.js                 # Express app configuration & middleware binding
│   └── server.js              # Server entry point loading env & DB connection
├── postman/
│   └── HisabDo_Day5_Student_API.postman_collection.json # Exported Postman collection
├── screenshots/               # API Testing Evidence & Postman Screenshots
├── test-api.js                # Automated zero-setup integration test suite
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Installation & Environment Setup

### 1. Prerequisites
- **Node.js** (v14+ recommended)
- **MongoDB** (Local MongoDB Community Server running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### 2. Install Dependencies
Navigate into the `Day 5` directory and run:

```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root of `Day 5` based on `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hisabdo_student_db
```

> ⚠️ **Note:** Do NOT commit your actual `.env` file or database credentials to GitHub. `.env` is listed in `.gitignore`.

---

## 🏃 How to Run the API

### Standard Execution:
```bash
npm start
```

### Development Execution (with auto-reload using nodemon):
```bash
npm run dev
```

The server will start listening at:
`http://localhost:5000`

---

## 🧪 Running Automated Tests

To test all endpoints, edge cases, Mongoose validation, and ObjectId checks automatically:

```bash
npm test
```

> 💡 **Zero Setup:** The automated test runner utilizes `mongodb-memory-server`, creating an isolated, temporary in-memory MongoDB instance during execution so tests pass out-of-the-box without requiring a running local MongoDB service!

---

## 📌 API Endpoints Overview

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/students` | Get all student documents | `200 OK` |
| **GET** | `/students/:id` | Get single student by MongoDB ObjectId | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **POST** | `/students` | Create a new student document | `201 Created`, `400 Bad Request` |
| **PUT** | `/students/:id` | Update existing student document | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/students/:id` | Delete student document by ObjectId | `200 OK`, `400 Bad Request`, `404 Not Found` |

---

## 📄 Sample Requests & Responses

### 1. GET `/students` (Fetch All Students)
**Request:**
`GET http://localhost:5000/students`

**Response (`200 OK`):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "64b0f9c2d1e2f3a4b5c6d7e8",
      "name": "Ayesha Khan",
      "email": "ayesha@example.com",
      "course": "Software Engineering",
      "marks": 94,
      "createdAt": "2026-08-07T23:00:00.000Z",
      "updatedAt": "2026-08-07T23:00:00.000Z"
    },
    {
      "id": "64b0f9c2d1e2f3a4b5c6d7e7",
      "name": "Muhammad Ali",
      "email": "ali@example.com",
      "course": "Computer Science",
      "marks": 88,
      "createdAt": "2026-08-07T22:50:00.000Z",
      "updatedAt": "2026-08-07T22:50:00.000Z"
    }
  ]
}
```

---

### 2. GET `/students/:id` (Fetch Student by ID)
**Request:**
`GET http://localhost:5000/students/64b0f9c2d1e2f3a4b5c6d7e8`

**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "id": "64b0f9c2d1e2f3a4b5c6d7e8",
    "name": "Ayesha Khan",
    "email": "ayesha@example.com",
    "course": "Software Engineering",
    "marks": 94,
    "createdAt": "2026-08-07T23:00:00.000Z",
    "updatedAt": "2026-08-07T23:00:00.000Z"
  }
}
```

**Error Response (`400 Bad Request` - Invalid ObjectId):**
`GET http://localhost:5000/students/invalid-id`
```json
{
  "success": false,
  "error": "Invalid ID",
  "message": "Invalid MongoDB ObjectId format: 'invalid-id'. Must be a 24-character hex string."
}
```

**Error Response (`404 Not Found`):**
`GET http://localhost:5000/students/507f1f77bcf86cd799439011`
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Student with ID '507f1f77bcf86cd799439011' was not found."
}
```

---

### 3. POST `/students` (Create New Student Document)
**Request:**
`POST http://localhost:5000/students`  
**Headers:** `Content-Type: application/json`

**Body:**
```json
{
  "name": "Usman Raza",
  "email": "usman@example.com",
  "course": "Cyber Security",
  "marks": 92
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Student record created successfully.",
  "data": {
    "id": "64b0f9c2d1e2f3a4b5c6d7e9",
    "name": "Usman Raza",
    "email": "usman@example.com",
    "course": "Cyber Security",
    "marks": 92,
    "createdAt": "2026-08-07T23:10:00.000Z",
    "updatedAt": "2026-08-07T23:10:00.000Z"
  }
}
```

---

### 4. PUT `/students/:id` (Update Student Document)
**Request:**
`PUT http://localhost:5000/students/64b0f9c2d1e2f3a4b5c6d7e9`  
**Headers:** `Content-Type: application/json`

**Body:**
```json
{
  "course": "Advanced Cyber Security",
  "marks": 98
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student record updated successfully.",
  "data": {
    "id": "64b0f9c2d1e2f3a4b5c6d7e9",
    "name": "Usman Raza",
    "email": "usman@example.com",
    "course": "Advanced Cyber Security",
    "marks": 98,
    "createdAt": "2026-08-07T23:10:00.000Z",
    "updatedAt": "2026-08-07T23:12:00.000Z"
  }
}
```

---

### 5. DELETE `/students/:id` (Delete Student Document)
**Request:**
`DELETE http://localhost:5000/students/64b0f9c2d1e2f3a4b5c6d7e9`

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student with ID '64b0f9c2d1e2f3a4b5c6d7e9' deleted successfully.",
  "data": {
    "id": "64b0f9c2d1e2f3a4b5c6d7e9",
    "name": "Usman Raza",
    "email": "usman@example.com",
    "course": "Advanced Cyber Security",
    "marks": 98
  }
}
```

---

## 🧪 Postman Testing Collection

Import the Postman collection JSON from `postman/HisabDo_Day5_Student_API.postman_collection.json`.

---

## 📧 Submission Info

Submitted to: `hisabdo.app@gmail.com`  
Program: **HisabDo MERN Stack Internship Program (Day 5)**
