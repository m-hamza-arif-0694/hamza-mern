# 🚀 Day 9 Capstone Project — Next.js 14 Setup & UI Implementation

Welcome to **Day 9 of the HisabDo MERN / Next.js Internship Program**. Today's deliverable moves from initial architecture planning into complete codebase initialization, App Router setup, responsive design system configuration, multi-page layout building, and interactive web app implementation.

---

## 📌 Submission & Deliverables Checklist

- [x] **1. Next.js Project Creation**: Configured inside `Day 9/` using Next.js 14 App Router.
- [x] **2. Folder Structure**: Clean, scalable folder layout separating components, design system, and sub-routes.
- [x] **3. Page Routing Setup**: Implemented public marketing routes (`/`, `/features`, `/pricing`, `/download`, `/contact`) and protected web app routes (`/dashboard`).
- [x] **4. Initial Layouts**: Responsive **Header/Navbar** with mobile drawer navigation, multi-column **Footer**, and Web App **Sidebar**.
- [x] **5. Major Implemented Pages**:
  - 🌐 **Home Landing Page (`/`)**: Hero section, live interactive cashbook widget, core feature grid, stats impact banner, client testimonials, and bottom CTA.
  - 📖 **Features Showcase (`/features`)**: In-depth interactive breakdown of all 4 HisabDo pillars (Digital Cashbook, Udhar Book, WhatsApp Reminders, PDF Reports).
  - 💰 **Pricing Tiers (`/pricing`)**: Interactive monthly/annual billing toggle and starter/pro/enterprise plans.
  - 📱 **App Download Portal (`/download`)**: QR codes for Android Play Store & desktop PWA links.
  - 📞 **Contact & Support (`/contact`)**: Interactive support form & headquarter info.
  - 📊 **Web App Dashboard (`/dashboard`)**: Working dashboard with real-time Cash In/Out calculation widgets, recent transactions table, and customer dues WhatsApp reminder modal.
- [x] **6. Responsiveness**: Fully responsive layout optimized across Mobile (375px), Tablet (768px), and Desktop (1280px+).
- [x] **7. GitHub Repository**: Committed and tracked on branch `main` at `https://github.com/m-hamza-arif-0694/hamza-mern.git`.

---

## 📁 Day 9 Project Directory Structure

```text
Day 9/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.jsx          # Home / Landing Page
│   │   │   ├── features/
│   │   │   │   └── page.jsx      # Features Showcase Page
│   │   │   ├── pricing/
│   │   │   │   └── page.jsx      # Pricing & Plans Page
│   │   │   ├── download/
│   │   │   │   └── page.jsx      # App Download Portal
│   │   │   └── contact/
│   │   │       └── page.jsx      # Contact & Support Page
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── layout.jsx    # Dashboard Layout with Sidebar
│   │   │       └── page.jsx      # Web App Dashboard Interface
│   │   ├── globals.css           # Glassmorphism Design System & CSS Variables
│   │   └── layout.jsx            # Root Layout with Navbar & Footer
│   ├── components/
│   │   ├── Navbar.jsx            # Responsive Top Header / Navbar with Mobile Drawer
│   │   ├── Footer.jsx            # Multi-column Public Footer
│   │   └── Sidebar.jsx           # Web App Dashboard Navigation Sidebar
├── next.config.js
├── package.json
└── README.md
```

---

## 📸 Screenshots Directory & Submission Visuals

All page screenshots required for the Day 9 submission are stored inside [`Day 9/screenshots/`](file:///e:/Hamza%20doc/HisabDo%20Internship/Day%209/screenshots/README.md):

* `01_home_landing_page.png` — Home Landing Page (`http://localhost:3000/`)
* `02_features_page.png` — Features Showcase Page (`http://localhost:3000/features`)
* `03_pricing_page.png` — Pricing & Plans (`http://localhost:3000/pricing`)
* `04_download_page.png` — App Download Portal (`http://localhost:3000/download`)
* `05_contact_page.png` — Contact Support Form (`http://localhost:3000/contact`)
* `06_dashboard_overview.png` — Dashboard Interface (`http://localhost:3000/dashboard`)
* `07_mobile_responsive_view.png` — Mobile Drawer Navigation View (375px)

---

## 🏃 How to Run the Day 9 Next.js Project

### Step 1: Open Terminal & Navigate to Day 9 Folder
```bash
cd "Day 9"
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view and explore all implemented pages.

### Step 4: (Optional) Build & Test Production Bundle
```bash
npm run build
npm run start
```

---

## 🛠️ Technology Stack
* **Framework**: Next.js 14 (App Router) & React 18
* **Icons**: `lucide-react`
* **Design System**: Custom CSS Glassmorphism with HSL tailored color palettes & keyframe animations
* **Version Control**: Git / GitHub (`origin/main`)

---

## 📧 Submission Info
* **Author**: Muhammad Hamza Arif
* **Program**: HisabDo MERN / Next.js Internship Track (Day 9)
* **Submitted to**: `hisabdo.app@gmail.com`

