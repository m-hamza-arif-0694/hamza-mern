# 🚀 Day 14 Capstone Project — Product Research & Mobile App Validation

Welcome to **Day 14 of the HisabDo MERN / Next.js Internship Program**. Today's project focuses on **Product Evaluation & Real User Validation**, presenting the **5 Real User Product Feedback Report**, updated application modules, and full GitHub submission documentation inside `Day 14/`.

---

## 📊 Short Progress Report (Day 14)

Today we successfully accomplished all required tasks inside `Day 14/`:

1. **User Validation & Product Research Sub-Task (`DAY14_USER_RESEARCH_REPORT.md`)**:
   - Introduced and tested newly released HisabDo features with **5 active business owners** across Pakistan (*Auto Workshop owner in Lahore, Pharmacy manager in Rawalpindi, Electronics dealer in Faisalabad, Textile supplier in Karachi, Bakery owner in Multan*).
   - Documented detailed feedback, issues discovered (*missing thousand separators, sub-category tags, confirmation modals*), recommended improvements, and visual evidence records.

2. **Full-Stack Web Application Scaffold & UI Foundation**:
   - **Authentication & Auth Guard**: Merchant Sign In (`/login`), Registration (`/register`), **Forgot Password UI (`/forgot-password`)** with OTP step, and Protected Dashboard Auth Guard (`src/context/AuthContext.jsx`).
   - **3 Core Functional CRUD Modules**:
     - **Digital Cashbook (`/dashboard/cashbook`)**: Create Cash In/Out, Read filterable ledger table, Edit Entry Modal, and Delete entry.
     - **Customer Udhar Book (`/dashboard/customers`)**: Create Customer with Pakistani phone validation (`+923xxxxxxxxx`), Read net dues (*You Will Get* vs *You Will Give*), Edit Customer Modal, Delete customer, and WhatsApp payment reminder modal.
     - **Multi-Business Branch Management (`/dashboard/businesses`)**: Add Branch, Read Branch List, Edit Branch Modal, Delete Branch, and 1-Click Active Branch Context Switcher.
   - **Responsive & Touch Layout**: Configured vertical stack layout (*Create Forms on top, Tables below*) and horizontal swipe containers (`horizontal-scroll-container`) for mobile viewports (`375px`).

---

## 📌 Submission & Minimum Requirements Checklist

- [x] **1. 5 Real User Research & Validation Report**: Documented in [`Day 14/DAY14_USER_RESEARCH_REPORT.md`](file:///e:/Hamza%20doc/HisabDo%20Internship/Day%2014/DAY14_USER_RESEARCH_REPORT.md).
- [x] **2. Authentication UI & Protection**: Login (`/login`), Register (`/register`), Forgot Password UI (`/forgot-password`), and Protected Route Guard.
- [x] **3. 3 Core Functional CRUD Modules**: Digital Cashbook, Customer Udhar Book, and Multi-Business Branch Management.
- [x] **4. Responsive & Mobile Viewport**: Responsive layout optimized for Mobile (375px), Tablet (768px), and Desktop (1280px+).
- [x] **5. GitHub Repository**: Tracked and committed on branch `main` at `https://github.com/m-hamza-arif-0694/hamza-mern.git`.

---

## 📁 Day 14 Project Folder Structure

```text
Day 14/
├── DAY14_USER_RESEARCH_REPORT.md  # 5 Real User Feedback & Product Validation Report
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.jsx      # Validated Login Page
│   │   │   ├── register/
│   │   │   │   └── page.jsx      # Validated Register Page
│   │   │   └── forgot-password/
│   │   │       └── page.jsx      # 2-Step OTP Password Reset UI
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── layout.jsx    # Auth-Protected Dashboard Layout
│   │   │       ├── page.jsx      # Protected Dashboard Overview
│   │   │       ├── cashbook/
│   │   │       │   └── page.jsx  # Core Module 1: Cashbook (CRUD)
│   │   │       ├── customers/
│   │   │       │   └── page.jsx  # Core Module 2: Udhar Ledger (CRUD)
│   │   │       └── businesses/
│   │   │           └── page.jsx  # Core Module 3: Multi-Business (CRUD)
│   │   ├── globals.css           # Glassmorphism & Responsive Helper CSS
│   │   └── layout.jsx            # Root Layout with AuthProvider
│   ├── components/
│   │   ├── ui/                   # Reusable UI Components (Button, Input, Card, Table, Modal)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   ├── context/
│   │   └── AuthContext.jsx       # Auth & Session Context Provider
│   └── lib/
│       └── validation.js         # Centralized Validation Functions
├── next.config.js
├── package.json
└── README.md
```

---

## 🏃 How to Run the Day 14 Application

### 1. Install Dependencies
```bash
cd "Day 14"
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📧 Submission Info
* **Author**: Muhammad Hamza Arif
* **Track**: HisabDo MERN / Next.js Internship Track (Day 14 Capstone)
* **Submitted to**: `hisabdo.app@gmail.com`
