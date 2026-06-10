# Nexus Commerce Dashboard

A highly aesthetic, next-generation Server-Rendered E-commerce Product Management Dashboard built with **Next.js (App Router)**, **MongoDB**, and **Tailwind CSS**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSresthkh%2Fecommerce-admin-dashboard&env=MONGODB_URI,NEXTAUTH_SECRET)

## 🚀 Features

- **Minimalist Dark Theme**: A stunning UI with page-specific aesthetic accents and glassmorphism.
- **Server-Side Rendering (SSR)**: Lightning-fast rendering powered by Next.js.
- **Secure Authentication**: Built with NextAuth (Credentials).
- **Comprehensive Product Management**: Full CRUD operations for your inventory.
- **Inventory Analytics**: Real-time insights, stock health tracking, and interactive charts.

## ⚙️ Environment Variables

To run this application (either on Vercel or locally), you will need to set the following environment variables:

- `MONGODB_URI`: Your MongoDB connection string.
- `NEXTAUTH_SECRET`: A random secret key for NextAuth (you can generate one using `openssl rand -base64 32`).
- `NEXTAUTH_URL`: The URL of your application (e.g., `http://localhost:3000` or your Vercel domain).

## 🛠 Tech Stack

- **Framework**: Next.js 16 (Turbopack)
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Styling**: Tailwind CSS & Vanilla CSS (Custom Themes)

## 🔐 Dummy Admin Credentials

If you seed your database with the default dummy user:
- **Email:** admin@example.com
- **Password:** admin123
