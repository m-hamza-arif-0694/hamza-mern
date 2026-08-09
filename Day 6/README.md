# 🔒 Secure REST API Authentication System (JWT + bcrypt) — HisabDo MERN Internship (Day 6)

Welcome to Day 6 of the **HisabDo MERN Stack Internship Program**. This repository contains a production-ready Node.js + Express backend authentication system secured with **JWT (JSON Web Tokens)** and **bcryptjs password hashing**, integrated with **MongoDB & Mongoose**.

---

## 🎯 Tech Stack & Core Libraries

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Local MongoDB / MongoDB Atlas)
* **ODM:** Mongoose Object Data Modeling
* **Authentication:** `jsonwebtoken` (JWT Bearer Token Authentication)
* **Security:** `bcryptjs` (Salt rounds: 10, pre-save hook password hashing)
* **Environment Config:** `dotenv`
* **Testing Suite:** Automated integration tests (`mongodb-memory-server`) & Postman Collection v2.1

---

## 📁 Project Structure

```
Day 6/
├── src/
│   ├── config/
│   │   └── db.js                 # Mongoose database connection with auto-fallback
│   ├── models/
│   │   └── User.js               # Mongoose User Schema (bcrypt pre-save, JWT signing, password hiding)
│   ├── controllers/
│   │   └── authController.js     # Register, Login, and Protected /me Profile controllers
│   ├── middleware/
│   │   ├── auth.js               # JWT Bearer Token verification & Protect route middleware
│   │   ├── validation.js         # Input validators for registration & login payloads
│   │   └── errorHandler.js       # 404 Route Not Found & 500 Global JWT/DB error handler
│   ├── routes/
│   │   └── authRoutes.js         # Express router mapping /api/auth endpoints
│   ├── app.js                    # Express app configuration & middleware binding
│   └── server.js                 # Server entry point
├── postman/
│   └── HisabDo_Day6_Auth_API.postman_collection.json # Exported Postman collection v2.1
├── screenshots/                  # Postman API Testing Evidence & Screenshots
├── test-api.js                   # Automated zero-setup integration test suite
├── .env.example                  # Environment variables template
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
Navigate into the `Day 6` directory and run:

```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root of `Day 6` based on `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hisabdo_auth_db
JWT_SECRET=hisabdo_jwt_secret_key_day6_2026_secure
JWT_EXPIRE=30d
```

> ⚠️ **Note:** Do NOT commit your actual `.env` file or secrets to GitHub. `.env` is listed in `.gitignore`.

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

To test all authentication endpoints, duplicate email prevention, password hashing, valid/invalid login, and protected route authorization automatically:

```bash
npm test
```

> 💡 **Zero Setup:** The automated test runner uses `mongodb-memory-server` to run tests out-of-the-box without requiring a running local MongoDB daemon!

---

## 📌 API Endpoints Overview

| Method | Endpoint | Access | Description | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Register a new user & return JWT token | `201 Created`, `400 Bad Request` |
| **POST** | `/api/auth/login` | Public | Authenticate email/password & return JWT token | `200 OK`, `401 Unauthorized`, `400 Bad Request` |
| **GET** | `/api/auth/me` | Protected (JWT) | Fetch current logged-in user profile | `200 OK`, `401 Unauthorized` |

---

## 📄 Sample Requests & Responses

### 1. POST `/api/auth/register` (User Registration)
**Request:**
`POST http://localhost:5000/api/auth/register`  
**Headers:** `Content-Type: application/json`

**Body:**
```json
{
  "name": "Hamza Arif",
  "email": "hamza@example.com",
  "password": "password123"
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6699a1b2c3d4e5f6a7b8c9d0",
    "name": "Hamza Arif",
    "email": "hamza@example.com",
    "role": "user",
    "createdAt": "2026-08-09T22:00:00.000Z"
  }
}
```

---

### 2. POST `/api/auth/login` (User Login)
**Request:**
`POST http://localhost:5000/api/auth/login`  
**Headers:** `Content-Type: application/json`

**Body:**
```json
{
  "email": "hamza@example.com",
  "password": "password123"
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "User login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6699a1b2c3d4e5f6a7b8c9d0",
    "name": "Hamza Arif",
    "email": "hamza@example.com",
    "role": "user",
    "createdAt": "2026-08-09T22:00:00.000Z"
  }
}
```

---

### 3. GET `/api/auth/me` (Protected User Profile)
**Request:**
`GET http://localhost:5000/api/auth/me`  
**Headers:**  
`Authorization: Bearer <YOUR_JWT_TOKEN>`

**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "id": "6699a1b2c3d4e5f6a7b8c9d0",
    "name": "Hamza Arif",
    "email": "hamza@example.com",
    "role": "user",
    "createdAt": "2026-08-09T22:00:00.000Z",
    "updatedAt": "2026-08-09T22:00:00.000Z"
  }
}
```

**Error Response (`401 Unauthorized` - Missing or Invalid Token):**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Access denied. Authorization Bearer token is missing."
}
```

---

## 🧪 Postman Testing Collection

Import the Postman collection JSON from `postman/HisabDo_Day6_Auth_API.postman_collection.json`.

---

## 📧 Submission Info

Submitted to: `hisabdo.app@gmail.com`  
Program: **HisabDo MERN Stack Internship Program (Day 6)**
