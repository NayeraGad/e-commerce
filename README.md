# 🛒 [FreshCart E-Commerce](https://e-commerce-orcin-seven-43.vercel.app/)

A full-featured, modern e-commerce web application built with **React** and **TailwindCSS**, offering a clean interface, user authentication, cart/wishlist functionality, and dynamic UI interactions for a seamless shopping experience.

[![FreshCart Preview](https://res.cloudinary.com/dedqtpla9/image/upload/FreshCart_preview_ftzmio.gif)](https://e-commerce-orcin-seven-43.vercel.app/)

<p align="center">
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge"/></a>
  <a href="https://tailwindcss.com/" target="_blank">
  <img src="https://img.shields.io/badge/Tailwind-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind Badge"/>
</a>
  <a href="https://tanstack.com/query/latest" target="_blank"><img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=tanstack&logoColor=white" alt="TanStack Query"/></a>
  <a href="https://axios-http.com/" target="_blank"><img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios Badge"/></a>
</p>

---

## ✨ Features

- 👤 User registration & login (with form validation)
- 🛍️ Browse products by category and brand
- ❤️ Add/remove items from **wishlist**
- 🛒 Full cart management with quantity updates and subtotal
- 🔍 Search functionality to quickly find products
- 🌙 Light/Dark mode toggle
- 💳 Stripe integration (via backend API)
- 🔐 Protected routes for cart and orders
- ✅ Form handling with Formik + Yup
- ⚡ Optimized API fetching with TanStack Query

---

## 🚀 Tech Stack

- **Frontend**: React, React Router, Formik, Yup
- **State Management & Data Fetching**: TanStack Query
- **HTTP Requests**: Axios
- **Styling**: TailwindCSS
- **Payment**: Stripe (backend integrated)
- **Build Tool**: Vite
- **Deployment**: [Vercel](https://vercel.com)

---

## 📁 Folder Structure

📦 e-commerce

┣ 📂public

┣ 📂src

┃ ┣ 📂assets # Static files (images)

┃ ┣ 📂Components # Reusable components (Navbar, Loading, etc.)

┃ ┣ 📂Context # Context provider for global state (cart, etc.)

┃ ┣ 📂Hooks # Custom hooks

┃ ┣ 📂Pages # Page components (Home, Products)

┃ ┣ 📜App.jsx # Main app structure with routes

┃ ┗ 📜main.jsx # Application entry point

┗ 📜index.html # HTML template for Vite

---

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/NayeraGad/e-commerce.git
   cd e-commerce

   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

---

## 📌 Notes

- This project focuses on front-end functionality.

- Stripe checkout is set up on the backend — ensure your backend is running if testing payments.

- You can integrate it with your own Express or NestJS API using the same API schema.

---

## 📄 License

This project is open-source and available under the [MIT License](https://raw.githubusercontent.com/NayeraGad/e-commerce/main/LICENSE).
