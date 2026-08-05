# 📚 Student Management System REST API — HisabDo MERN Internship (Day 4)

Welcome to Day 4 of the **HisabDo MERN Stack Internship Program**. This repository contains a fully functional Node.js + Express REST API for a Student Management System with robust validation, clean route handling, in-memory array persistence, and comprehensive HTTP error handling.

---

## 🎯 Tech Stack & Tools

* **Runtime:** Node.js
* **Framework:** Express.js
* **Architecture:** REST API Architecture
* **Format:** JSON (JavaScript Object Notation)
* **Testing Tools:** Postman / Thunder Client / Custom Test Suite

---

## 📁 Project Structure

```
Day 4/
├── src/
│   ├── data/
│   │   └── studentsData.js    # In-memory student array & helper CRUD operations
│   ├── middleware/
│   │   ├── validation.js      # Input validation & ID param checking
│   │   └── errorHandler.js    # 404 Route Not Found & 500 Global error middleware
│   ├── routes/
│   │   └── studentRoutes.js   # Express router for /students endpoints
│   ├── app.js                 # Express app configuration & middleware binding
│   └── server.js              # Server entry point
├── postman/
│   └── HisabDo_Day4_Student_API.postman_collection.json # Exported Postman collection
├── test-api.js                # Automated verification script
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup Steps

### 1. Prerequisites
Make sure you have **Node.js** (v14+ recommended) installed on your system.

### 2. Install Dependencies
Navigate into the `Day 4` directory and run:

```bash
npm install
```

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

To test all endpoints, edge cases, and validation rules automatically:

```bash
npm test
```

---

## 📌 API Endpoints Overview

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/students` | Get all student records | `200 OK` |
| **GET** | `/students/:id` | Get student details by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **POST** | `/students` | Create a new student record | `201 Created`, `400 Bad Request` |
| **PUT** | `/students/:id` | Update existing student by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/students/:id` | Delete student record by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |

---

## 📄 Sample Requests & Responses

### 1. GET `/students` (Fetch All Students)
**Request:**
`GET http://localhost:5000/students`

**Response (`200 OK`):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "Muhammad Ali",
      "email": "ali@example.com",
      "course": "Computer Science",
      "marks": 88
    },
    {
      "id": 2,
      "name": "Ayesha Khan",
      "email": "ayesha@example.com",
      "course": "Software Engineering",
      "marks": 94
    }
  ]
}
```

---

### 2. GET `/students/:id` (Fetch Student by ID)
**Request:**
`GET http://localhost:5000/students/1`

**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Muhammad Ali",
    "email": "ali@example.com",
    "course": "Computer Science",
    "marks": 88
  }
}
```

**Error Response (`404 Not Found`):**
`GET http://localhost:5000/students/999`
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Student with ID 999 was not found."
}
```

---

### 3. POST `/students` (Create New Student)
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
    "id": 6,
    "name": "Usman Raza",
    "email": "usman@example.com",
    "course": "Cyber Security",
    "marks": 92
  }
}
```

**Error Response (`400 Bad Request` - Invalid/Missing Data):**
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    "Name is required and must be a non-empty string.",
    "A valid email address is required.",
    "Marks must be between 0 and 100."
  ]
}
```

---

### 4. PUT `/students/:id` (Update Student)
**Request:**
`PUT http://localhost:5000/students/2`
**Headers:** `Content-Type: application/json`

**Body:**
```json
{
  "course": "Advanced Software Engineering",
  "marks": 98
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student record updated successfully.",
  "data": {
    "id": 2,
    "name": "Ayesha Khan",
    "email": "ayesha@example.com",
    "course": "Advanced Software Engineering",
    "marks": 98
  }
}
```

---

### 5. DELETE `/students/:id` (Delete Student)
**Request:**
`DELETE http://localhost:5000/students/4`

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student with ID 4 deleted successfully.",
  "data": {
    "id": 4,
    "name": "Sara Ahmed",
    "email": "sara@example.com",
    "course": "Computer Science",
    "marks": 76
  }
}
```

---

## 🧪 Postman Testing & Screenshots

A Postman collection JSON file is available under `postman/HisabDo_Day4_Student_API.postman_collection.json`.

### Tested Scenarios:
- ✅ Successful retrieval, creation, modification, and deletion.
- ❌ Invalid Student ID (e.g. `/students/abc` -> `400 Bad Request`).
- ❌ Non-existent Student ID (e.g. `/students/999` -> `404 Not Found`).
- ❌ Missing required fields on POST.
- ❌ Invalid email format and out-of-range marks (> 100 or < 0).

---

## 📧 Submission Info

Submitted to: `hisabdo.app@gmail.com`  
Program: **HisabDo MERN Stack Internship Program (Day 4)**
