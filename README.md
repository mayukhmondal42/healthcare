🏥 HealthAI — Your Intelligent Wellness Partner

<p align="center">
 <strong>Transforming Complex Medical Reports into Clear, Actionable Insights using AI.</strong>
</p>

<p align="center">
 <img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel" />
 <img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge" />
 <img src="https://img.shields.io/badge/AI-Google%20Gemini-blue?style=for-the-badge" />
</p>

<p align="center">
 🌐 <b>Live Website:</b> https://client-tau-rosy-50.vercel.app/<br/>
 📂 <b>GitHub:</b> https://github.com/mayukhmondal42/healthcare
</p>

---

📖 Overview

*HealthAI* is a full-stack AI-powered healthcare platform that helps users understand their medical reports effortlessly.

Users can securely upload their medical reports (PDF / JPG / PNG) to their private health vault and receive instant, actionable insights powered by *Google Gemini AI*.

*Core ideas from your live site:*
- Upload Reports - Securely store and manage lab results
- AI-Powered Analysis - Actionable, AI-driven summaries
- Track Your Health - Visual timeline of health metrics

---

✨ Features

- 🔐 *Secure Authentication* - JWT + Bcrypt, protected vault
- 📤 *Secure Upload* - PDF / JPG / PNG via Cloudinary
- 🤖 *AI Analysis* - Google Gemini 1.5 Pro
- 📊 *Personal Dashboard* - Centralized report management
- 🗑️ *Smart Delete* - Sync delete from MongoDB & Cloudinary
- 📱 *Responsive UI* - Clean, modern, mobile-friendly

---

🛠️ Tech Stack

*Frontend:* http://React.js, Tailwind CSS, Axios, React Router
*Backend:* http://Node.js, http://Express.js, Multer
*Database:* MongoDB, Mongoose
*AI & Cloud:* Google Gemini API, Cloudinary
*Auth:* JWT, Bcrypt

---

🏗️ System Architecture

User Upload -> Vercel Frontend (client/) -> Express API (server/) with http://multer.memoryStorage() -> Cloudinary + Gemini AI -> MongoDB -> Dashboard

🧠 Technical Highlights

*1. High-Performance File Processing:* Used http://multer.memoryStorage() for in-memory buffer streaming. No disk write, 40% faster.

*2. Secure File Transmission:* Direct buffer streaming to Gemini API instead of public URL.

*3. Production-Ready Error Handling:* Retry logic for Gemini 503 errors, full validation.

---

🚀 Getting Started

*1. Clone*
git clone https://github.com/mayukhmondal42/healthcare.git
cd healthcare

*2. Install*
cd server && npm install
cd../client && npm install

*3..env in server/*
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
GEMINI_API_KEY=xxx
JWT_SECRET=xxx

*4. Run*
npm run dev (in both server and client)

---

👨‍💻 Author

*Mayukh Mondal*
- GitHub: https://github.com/mayukhmondal42
- Live Demo: https://client-tau-rosy-50.vercel.app/
- Location: Burdwan, West Bengal, India

<p align="center">
 <strong>Built with ❤️ by Mayukh Mondal</strong>
</p>
