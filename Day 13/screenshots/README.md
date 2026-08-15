# 📸 Day 13 Project Screenshots & Submission Visuals

This directory contains screenshots of the **User Research Report**, **Authentication Foundation**, **Forgot Password UI Workflow**, and **Authentication Flow Diagram** for the **Day 13 Capstone Submission**.

---

## 📷 Screenshots List & File Checklist

Save your captured page screenshots inside this `Day 13/screenshots/` directory with the following filenames:

1. **`01_user_research_report.png`**:
   - **Page**: User Research Report ([`Day 13/DAY13_USER_RESEARCH_REPORT.md`](file:///e:/Hamza%20doc/HisabDo%20Internship/Day%2013/DAY13_USER_RESEARCH_REPORT.md))
   - **Content**: 5 Real User Feedback Matrix, issues found, recommended improvements, and shopkeeper profiles.

2. **`02_merchant_login_page.png`**:
   - **Page**: Merchant Login Page (`http://localhost:3000/login`)
   - **Content**: Validated sign-in form with email & password inputs, JWT token session generator, and forgot password link.

3. **`03_merchant_register_page.png`**:
   - **Page**: Merchant Registration Page (`http://localhost:3000/register`)
   - **Content**: Validated onboarding form for new shopkeepers with matching password verification.

4. **`04_forgot_password_step1.png`**:
   - **Page**: Forgot Password Page — Step 1 (`http://localhost:3000/forgot-password`)
   - **Content**: Step 1 email entry form to request 4-digit password reset OTP code.

5. **`05_forgot_password_step2.png`**:
   - **Page**: Forgot Password Page — Step 2 (`http://localhost:3000/forgot-password`)
   - **Content**: 4-Digit OTP verification (`1234`), new password entry form, and success notification banner.

6. **`06_auth_flow_mermaid_diagram.png`**:
   - **Page**: Authentication Flow Diagram ([`Day 13/README.md`](file:///e:/Hamza%20doc/HisabDo%20Internship/Day%2013/README.md))
   - **Content**: Rendered Mermaid sequence diagram depicting login, registration, OTP recovery, and route guard session lifecycle.

7. **`07_protected_dashboard_overview.png`**:
   - **Page**: Protected Web App Dashboard (`http://localhost:3000/dashboard`)
   - **Content**: Authenticated merchant session header, active branch context switcher, and 3 core module summary cards.

8. **`08_mobile_responsive_view.png`**:
   - **Page**: Mobile Viewport (375px)
   - **Content**: Mobile responsive view of the login, forgot password UI, and dashboard navigation menu (`Ctrl + Shift + M`).

---

## 🏃 How to Run Day 13 Project & Capture Screenshots

1. Open terminal and navigate to Day 13:
   ```bash
   cd "Day 13"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch development server:
   ```bash
   npm run dev
   ```
4. Open browser at `http://localhost:3000/login` or `http://localhost:3000/forgot-password`.
5. Capture screenshots and save the PNG images into `Day 13/screenshots/`.
