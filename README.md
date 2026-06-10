# Nexus Commerce Admin Dashboard

This project is a **server-side rendered (SSR) admin dashboard** built to manage products in an e-commerce system.
It features a brand-new **modern minimalist aesthetic** with dynamic page-specific themes, sleek typography, and a simplified user experience.

---

## 🚀 Open Directly in Browser

Click the links below to instantly open and run this project right in your browser—no downloads or setup required!

👉 **[Open in GitHub Codespaces](https://codespaces.new/Sresthkh/ecommerce-admin-dashboard)**
👉 **[Open in StackBlitz](https://stackblitz.com/github/Sresthkh/ecommerce-admin-dashboard)**

*(You can also press the `.` key on your keyboard while viewing the [GitHub Repository](https://github.com/Sresthkh/ecommerce-admin-dashboard) to instantly open the web editor!)*

---

## 🚀 Features

- **Modern Minimalist UI:** Completely overhauled layout with a dynamic theme engine using CSS variables, frosted glassmorphism cards, and sleek hover animations.
- **Server-side Rendering:** Built using **Next.js (App Router)** for maximum performance and SEO.
- **Secure Authentication:** Admin-only access with login and logout functionality powered by NextAuth.
- **Complete Product Management (CRUD):**
  - Create products effortlessly using a clean, single-page 2-column layout
  - View, edit, and delete products in real-time
- **Data Validation:** Strong input validation using **Zod** schema parsing.
- **Advanced Inventory Analytics:**
  - Real-time stock calculation
  - Low stock alerts and health scores
  - Interactive **Recharts** visualization (Bar and Pie charts)
- **Admin Onboarding:** Private route for super-admins to onboard new administrative users.

---

## 🛠 Tech Stack

- **Frontend & Backend:** Next.js (App Router)
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth.js (Credentials-based)
- **Validation:** Zod
- **Charts & Visualization:** Recharts
- **Styling:** CSS Modules / Global CSS Custom Properties

---

## 🔐 Dummy Admin Credentials

Use the following credentials to explore the dashboard:
- **Email:** `admin@example.com`
- **Password:** `admin123`

> *These are dummy credentials created solely for demonstration purposes.*

---

## 🧑‍💻 Getting Started (Run Locally)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Sresthkh/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set up Environment Variables
Create a `.env.local` file in the root directory and add your MongoDB connection string and NextAuth secret:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce-admin
NEXTAUTH_SECRET=your_super_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

### 4️⃣ Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🎥 Demo Video

*(Demo video link will be added here)*
