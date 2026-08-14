# 📸 Day 8 Capstone Project Screenshots & Submission Visuals

This directory contains the screenshots of the architecture analysis, user flow diagrams, frontend application, and backend REST API server for the **Day 8 Capstone Submission**.

---

## 📷 Screenshots List & File Checklist

Save your captured screenshots inside this `screenshots/` directory with the following filenames:

1. **`01_hisabdo_website_analysis.png`**:
   - **Target**: HisabDo Official Website / Landing Page (`https://hisabdo.com/` or `http://localhost:3000`)
   - **Content**: Website exploration showing Hero section, branding, and digital cashbook features.

2. **`02_user_flow_diagram.png`**:
   - **Target**: User Flow Diagram (`Day 8/DAY8_ANALYSIS.md`)
   - **Content**: Mermaid flowchart depicting merchant registration, cashbook logging, Udhar ledgers, and PDF reports.

3. **`03_nextjs_frontend_app.png`**:
   - **Target**: Next.js 14 App Router Frontend (`http://localhost:3000`)
   - **Content**: Running frontend application scaffold showing responsive layout and navigation.

4. **`04_express_backend_api.png`**:
   - **Target**: Express REST API Server (`http://localhost:5000/api/health` or terminal window)
   - **Content**: Terminal output showing Node.js Express server running on port 5000 with MongoDB connection.

5. **`05_architecture_analysis_doc.png`**:
   - **Target**: `Day 8/DAY8_ANALYSIS.md` Architecture Document
   - **Content**: 8 Website Pages List, 7 Web App Modules, Proposed Tech Stack, and 10 UI/UX Suggestions.

6. **`06_mobile_app_features.png`**:
   - **Target**: Mobile Viewport (375px) / Mobile App View
   - **Content**: Mobile responsive interface showing cashbook logger and customer credit tracking.

---

## 🏃 How to Run Day 8 Servers & Capture Screenshots

### 1. Run Express Backend Server (Port 5000)
```bash
cd "Day 8/backend"
npm install
npm run dev
```

### 2. Run Next.js Frontend App (Port 3000)
```bash
cd "Day 8/frontend"
npm install
npm run dev
```

### 3. Capture Screenshots
* Open your browser at `http://localhost:3000` (Frontend) and `http://localhost:5000/api/health` (Backend).
* Press **`Windows + Shift + S`** (or DevTools `Ctrl + Shift + P` -> *Capture screenshot*) and save images into `Day 8/screenshots/`.
