# Server-Rendered E-commerce Product Management Dashboard

This project is a **server-side rendered (SSR) admin dashboard** built to manage products in an e-commerce system.  
The main goal of this project is to understand how real-world admin dashboards work using **Next.js, MongoDB, and server-side rendering**.

Admins can log in, manage products, upload images, and monitor inventory using charts and analytics.

---

## 🚀 Features

- Server-side rendered admin dashboard using **Next.js (App Router)**
- Secure **admin authentication** with login and logout
- Admin-only access to dashboard routes
- Complete **Product Management (CRUD)**:
  - Create product
  - View products
  - Update product (including image update)
  - Delete product
- **Multi-step product creation form**
- Strong input validation using **Zod**
- **Image upload** using **Cloudinary**
- Product images displayed in dashboard table
- Inventory analytics and insights:
  - Total products
  - Total stock
  - Low stock alerts
  - Inventory health score
- Interactive charts for stock and inventory trends
- Admin-only route to onboard another admin (not visible to general users)

---

## 🛠 Tech Stack

- **Frontend & Backend:** Next.js (App Router)
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth (Credentials-based)
- **Validation:** Zod
- **Image Storage:** Cloudinary
- **Charts & Visualization:** Recharts
- **Styling:** CSS / Tailwind CSS

---

## ⚙️ How the Application Works

1. Admin logs in using credentials  
2. Dashboard page is rendered on the **server**
3. Product data is fetched from MongoDB
4. Admin can create, edit, or delete products
5. Images are uploaded to Cloudinary and stored securely
6. Inventory data updates automatically and charts refresh

---

## 🔐 Dummy Admin Credentials

Use the following credentials to log in to the dashboard:
Email: admin@example.com
Password: admin123

> These are **dummy credentials** created only for demonstration and evaluation purposes.

---

## 🧑‍💻 Getting Started (Run Locally)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Sresthkh/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
