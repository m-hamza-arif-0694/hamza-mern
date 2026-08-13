# 🚀 Day 12 Capstone Project — 3 Core Functional CRUD Modules & Auth-Protected Portal

Welcome to **Day 12 of the HisabDo MERN / Next.js Internship Program**. Today's implementation expands the Web Application with **3 Core Functional CRUD Modules**, an **Authentication-Protected User Portal**, and a **Multi-Business Branch Management System**.

---

## 📊 Short Progress Report (Day 12)

Today we transformed the application into a 3-module authenticated web portal inside `Day 12/`:

1. **Authentication-Protected UI Structure (`AuthContext.jsx` & `(auth)`)**:
   - **Context & Session Management**: Built `AuthContext.jsx` handling merchant user state (`user`, `token`, `activeBranch`).
   - **Merchant Sign In (`/login`)**: Validated login form with email & password validation, simulated JWT authentication token, and protected route redirect to `/dashboard`.
   - **Merchant Registration (`/register`)**: Validated onboarding form for new shopkeepers.
   - **Auth Guard**: Protected `/dashboard` routes requiring an active authenticated merchant session.

2. **3 Core Functional CRUD Modules**:
   - **Module 1: Digital Cashbook (`/dashboard/cashbook`)**: Full CRUD (Create Cash In/Out, Read filterable list, Edit Entry Modal with instant balance recalculations, and Delete entries).
   - **Module 2: Customer Udhar Book (`/dashboard/customers`)**: Full CRUD (Create Customer with Pakistani phone validation `+923xxxxxxxxx`, Read net dues, Edit Customer Modal, Delete customer profiles, and trigger automated WhatsApp payment reminder modals).
   - **Module 3: Multi-Business Branch Management (`/dashboard/businesses`) [NEW 3RD CORE MODULE]**:
     - **Create**: Add Business Branch Form (Branch Name, Type, City, Initial Starting Cash).
     - **Read**: Directory of all registered shop outlets with active status badges.
     - **Update / Edit**: Full **Edit Branch Modal Dialog** allowing merchants to update location, type, or cash pool.
     - **Delete**: Remove branch profile with confirm prompt.
     - **Branch Switcher**: 1-Click active branch switcher updating global `AuthContext` across the entire Web App.

3. **State UI Handlers & Connected Navigation**:
   - Integrated `StateAlert.jsx` for Loading skeletons, Empty query states, and Error banners.
   - Connected navigation bar and sidebar linking all 3 modules seamlessly.

---

## 📌 Submission & Minimum Requirements Checklist

- [x] **1. 3 Core Functional Modules**:
  - Module 1: Digital Cashbook (Full CRUD)
  - Module 2: Customer Udhar Book (Full CRUD)
  - Module 3: Multi-Business & Branch Management (Full CRUD)
- [x] **2. Working Navigation**: Header Navbar & Web App Sidebar connected across all routes.
- [x] **3. Auth-Protected UI Structure**: Merchant Login (`/login`), Registration (`/register`), and Auth Guard Dashboard layout.
- [x] **4. CRUD Operations**: Create forms, Read tables/grids, Edit Modal Dialogs, and Delete capabilities across all 3 modules.
- [x] **5. Form Validation**: Real-time validation for amounts (> 0), Pakistani phone numbers (`+923xxxxxxxxx`), email syntax, passwords, and required fields.
- [x] **6. Responsive UI**: Fully responsive layout for Mobile (375px), Tablet (768px), and Desktop (1280px+).
- [x] **7. GitHub Repository**: Tracked and committed on branch `main` at `https://github.com/m-hamza-arif-0694/hamza-mern.git`.

---

## 📁 Day 12 Project Folder Structure

```text
Day 12/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.jsx      # Validated Merchant Login
│   │   │   └── register/
│   │   │       └── page.jsx      # Validated Merchant Registration
│   │   ├── (marketing)/
│   │   │   ├── page.jsx          # Home Page with 3 Modules Showcase
│   │   │   ├── features/
│   │   │   │   └── page.jsx      # Features Showcase
│   │   │   ├── pricing/
│   │   │   │   └── page.jsx      # Pricing Tiers
│   │   │   ├── download/
│   │   │   │   └── page.jsx      # Download Portal
│   │   │   └── contact/
│   │   │       └── page.jsx      # Contact Form
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── layout.jsx    # Auth-Protected Dashboard Layout
│   │   │       ├── page.jsx      # Protected Dashboard Overview
│   │   │       ├── cashbook/
│   │   │       │   └── page.jsx  # Core Module 1: Digital Cashbook (CRUD)
│   │   │       ├── customers/
│   │   │       │   └── page.jsx  # Core Module 2: Udhar Customer Ledger (CRUD)
│   │   │       └── businesses/
│   │   │           └── page.jsx  # Core Module 3: Multi-Business Branches (CRUD)
│   │   ├── globals.css           # Glassmorphism & State Alert CSS
│   │   └── layout.jsx            # Root Layout with AuthProvider
│   ├── components/
│   │   ├── ui/                   # Reusable Component Primitives
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── StateAlert.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   ├── context/
│   │   └── AuthContext.jsx       # Auth & Session Context Provider
│   └── lib/
│       └── validation.js         # Centralized Validation Engine
├── next.config.js
├── package.json
└── README.md
```

---

## 🏃 How to Run the Day 12 Application

### 1. Install Dependencies
```bash
cd "Day 12"
npm install
```

### 2. Launch Next.js Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📧 Submission Info
* **Author**: Muhammad Hamza Arif
* **Track**: HisabDo MERN / Next.js Internship Track (Day 12 Capstone)
* **Submitted to**: `hisabdo.app@gmail.com`
