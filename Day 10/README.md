# 🚀 Day 10 Capstone Project — Core Functionality & Reusable Component System

Welcome to **Day 10 of the HisabDo MERN / Next.js Internship Program**. Today's implementation advances from layout design into building **core functional application modules**, creating a modular **Reusable UI Component Library** (`src/components/ui/`), and enforcing **client-side form validation**.

---

## 📌 Submission & Minimum Requirements Checklist

- [x] **1. Working Dashboard**: Production dashboard interface with interactive metric widgets and activity feeds.
- [x] **2. Functional Modules**:
  - 📖 **Digital Cashbook (`/dashboard/cashbook`)**: Validated Cash In (+) and Cash Out (-) entry forms, category filtering (Sales, Expenses, Salary, Utilities, Inventory), transaction search, and real-time running cash balance recalculation.
  - 🤝 **Customer Udhar Book (`/dashboard/customers`)**: Validated Add Customer directory, You Gave vs. You Got debit/credit ledger tracking, per-customer net balance calculation (*You Will Get* vs *You Will Give*), and **automated WhatsApp payment reminder template modal**.
- [x] **3. Reusable UI Component System (`src/components/ui/`)**:
  - `Button.jsx`: Variant system (`primary`, `secondary`, `success`, `danger`, `outline`), size controls (`sm`, `md`, `lg`), loading spinner, and icon integration.
  - `Input.jsx`: Input wrapper with labels, prefix icons, and real-time validation error alerts (`error` prop).
  - `Select.jsx`: Select dropdown control with validation state.
  - `Card.jsx`: Glassmorphism card container with `CardHeader` and `CardBody`.
  - `Table.jsx`: Reusable responsive data table with empty state handling and column formatting.
  - `Badge.jsx`: Status & category badges (`blue`, `green`, `red`, `purple`, `yellow`).
  - `Modal.jsx`: Accessible modal dialog for WhatsApp reminder previews and entry forms.
- [x] **4. Client-Side Form Validation System (`src/lib/validation.js`)**:
  - `validateAmount(amount)`: Ensures numeric amounts strictly greater than Rs. 0.
  - `validatePhone(phone)`: Enforces Pakistani phone number formats (`+923xxxxxxxxx` or `03xxxxxxxxx`).
  - `validateRequired(val, field)`: Checks non-empty text fields.
  - `validateEmail(email)`: Validates email format syntax.
- [x] **5. Navigation between Pages**: Full public site navigation (`/`, `/features`, `/pricing`, `/download`, `/contact`) and web app dashboard navigation (`/dashboard`, `/dashboard/cashbook`, `/dashboard/customers`).
- [x] **6. Responsive UI**: Responsive layouts tailored for Mobile (375px), Tablet (768px), and Desktop (1280px+).
- [x] **7. GitHub Repository**: Tracked and committed on branch `main` at `https://github.com/m-hamza-arif-0694/hamza-mern.git`.

---

## 📸 Screenshots Directory & Submission Visuals

All page screenshots required for the Day 10 submission are stored inside [`Day 10/screenshots/`](file:///e:/Hamza%20doc/HisabDo%20Internship/Day%2010/screenshots/README.md):

* `01_dashboard_overview.png` — Working Dashboard Overview (`http://localhost:3000/dashboard`)
* `02_cashbook_module.png` — Digital Cashbook Functional Module (`http://localhost:3000/dashboard/cashbook`)
* `03_customer_udhar_module.png` — Customer Udhar Book Functional Module (`http://localhost:3000/dashboard/customers`)
* `04_whatsapp_reminder_modal.png` — WhatsApp Payment Reminder Template Modal
* `05_form_validation_errors.png` — Inline Form Validation Errors (`src/lib/validation.js`)
* `06_reusable_ui_components.png` — Reusable UI Component Library (`src/components/ui/`)

---

## 📝 Short Description of Today's Implementation (Day 10)

Today, we engineered the core functional backbone of the HisabDo Web Application inside `Day 10/`. First, we established a clean **UI Component Library** under `src/components/ui/` containing modular primitives (`Button`, `Input`, `Select`, `Card`, `Table`, `Badge`, `Modal`). Next, we wrote a centralized validation utility `src/lib/validation.js` providing immediate feedback on invalid amounts, missing fields, or incorrect phone formats.

Using these primitives, we built two core functional modules:
1. **Digital Cashbook (`/dashboard/cashbook`)**: Allows shopkeepers to log daily cash in/out entries with category tags, filter entries by category, search notes, and view running cash balances update in real-time.
2. **Customer Udhar Book (`/dashboard/customers`)**: Manages customer credit ledgers with phone number validation, tracks net dues (*Paisa Lena Hai* vs *Paisa Dena Hai*), and triggers an automated WhatsApp payment reminder template modal with pre-filled debt details.

---

## 📁 Day 10 Project Folder Structure

```text
Day 10/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.jsx          # Home Landing Page with Live Cashbook Demo
│   │   │   ├── features/
│   │   │   │   └── page.jsx      # Features Showcase
│   │   │   ├── pricing/
│   │   │   │   └── page.jsx      # Pricing & Plans Page
│   │   │   ├── download/
│   │   │   │   └── page.jsx      # Download Portal
│   │   │   └── contact/
│   │   │       └── page.jsx      # Validated Contact Form Page
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── layout.jsx    # Dashboard Layout with Sidebar
│   │   │       ├── page.jsx      # Dashboard Overview
│   │   │       ├── cashbook/
│   │   │       │   └── page.jsx  # Functional Module 1: Digital Cashbook
│   │   │       └── customers/
│   │   │           └── page.jsx  # Functional Module 2: Udhar Customer Ledger
│   │   ├── globals.css           # Design System & Form Validation CSS
│   │   └── layout.jsx            # Root Layout
│   ├── components/
│   │   ├── ui/                   # Reusable UI Primitives
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Modal.jsx
│   │   ├── Navbar.jsx            # Public Header
│   │   ├── Footer.jsx            # Public Footer
│   │   └── Sidebar.jsx           # Web App Sidebar
│   └── lib/
│       └── validation.js         # Client-Side Form Validation Helpers
├── next.config.js
├── package.json
└── README.md
```

---

## 🏃 How to Run the Day 10 Application

### 1. Install Dependencies
```bash
cd "Day 10"
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
* **Track**: HisabDo MERN / Next.js Internship Track (Day 10 Capstone)
* **Submitted to**: `hisabdo.app@gmail.com`
