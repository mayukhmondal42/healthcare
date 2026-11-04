# 🏥 HealthAI — Your Intelligent Wellness Partner

<p align="center">
 <strong>Transforming Complex Medical Reports into Clear, Actionable Insights using AI.</strong>
</p>

<p align="center">
 <img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel" />
 <img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge" />
 <img src="https://img.shields.io/badge/AI-Google%20Gemini-blue?style=for-the-badge" />
 <img src="https://img.shields.io/badge/Cloud-Cloudinary-orange?style=for-the-badge" />
</p>

<p align="center">
 🌐 <b>Live Website:</b> https://client-tau-rosy-50.vercel.app/<br/>
 📂 <b>GitHub:</b> https://github.com/mayukhmondal42/healthcare
</p>

---

## 📖 Overview

**HealthAI** is a full-stack AI-powered healthcare intelligence platform that helps users understand their medical reports effortlessly.

Instead of searching complex medical terms on Google, users can upload lab reports (PDF / Image) to their private health vault and get instant, actionable insights powered by **Google Gemini AI**.

**Core Concepts from Live Site:**
- **Upload Reports:** Securely store and manage your lab results in one encrypted dashboard
- **AI-Powered Analysis:** Receive actionable, AI-driven summaries of complex medical data
- **Track Your Health:** Keep a visual timeline of your health metrics and recovery progress

---

## ✨ Features

### 🔐 Secure Authentication
* JWT + Bcrypt based authentication
* Protected routes - "Sign in to your health vault"
* User-specific data isolation

### 🤖 AI-Powered Report Analysis
* Upload PDF, JPG, PNG reports
* Automated parsing using Google Gemini 1.5 Pro
* Easy-to-understand summaries & key findings
* Medical terms explained in simple language
* Multi-language support

### ☁️ Cloud-Based Storage
* Secure upload via Cloudinary
* Fast CDN-based retrieval
* Auto-sync delete between MongoDB & Cloudinary

### 📊 Personal Health Dashboard
* Centralized report management
* View AI-generated insights anytime
* Complete history tracking

### 🗑️ Report Management
* Upload, view, analyze, delete reports
* Maintains database consistency and integrity

---

## 📸 Application Preview

Live: https://client-tau-rosy-50.vercel.app/

### Authentication
![Auth](Img/Authentication_Page.jpeg)

### Dashboard
![Dashboard](Img/Dashboard.jpeg)

### Dashboard With Reports
![Dashboard With Reports](Img/Dashboard_With_Reports.jpeg)

### AI Report Analysis
![AI Analysis](Img/Report_Details_Page.jpeg)

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios, React Router DOM, SweetAlert2
**Backend:** Node.js, Express.js, Multer
**Database:** MongoDB, Mongoose ODM
**AI & Cloud Services:** Google Gemini API, Cloudinary
**Authentication:** JWT, Bcrypt.js
**Deployment:** Vercel

---

## 🏗️ System Architecture

```text
User Upload
 |
 v
Vercel Frontend (client/)
 |
 v
Express API (server/) - multer.memoryStorage()
 |
 |----> Cloudinary Storage
 |
 |----> Google Gemini AI Analysis
 |
 v
MongoDB Database
 |
 v
Personal Dashboard

🧠 Technical Highlights

*1. High-Performance File Processing:* Implemented in-memory pipeline using `multer.memoryStorage()` - eliminates disk operations, faster upload, real-time AI processing.

*2. Secure File Transmission:* Migrated from public file URLs to direct buffer streaming to Gemini API.

*3. Production-Ready Error Handling:* Custom retry logic for Gemini 503 errors, robust validation on both frontend & backend.

---

🚀 Getting Started

*1. Clone the Repository*

git clone https://github.com/mayukhmondal42/healthcare.git
cd healthcare

*2. Install Dependencies*

# Server
cd server
npm install

# Client
cd../client
npm install

*3. Environment Variables*
Create `.env` file inside `server/` folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret

*4. Start Development Server*

# Backend
npm run dev

# Frontend
npm run dev

---

🎯 Future Enhancements

- OCR support for handwritten prescriptions
- Health trend tracking and analytics
- Doctor-sharing functionality via secure link
- AI-powered medication explanations
- Mobile application support
- Voice-based report summaries

---

👨‍💻 Author

*Mayukh Mondal*
- GitHub: https://github.com/mayukhmondal42
- Project: https://github.com/mayukhmondal42/healthcare
- Live Demo: https://client-tau-rosy-50.vercel.app/
- Location: Burdwan, West Bengal, India

---

⭐ Support

If you found this project helpful, please give it a star on GitHub!

<p align="center">
 <strong>Built with ❤️ by Mayukh Mondal for the future of digital healthcare.</strong>
</p>
