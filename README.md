# 🏥 HealthAI — AI-Powered Medical Report Analysis Platform

<p align="center">
  <strong>Transforming Complex Medical Reports into Clear, Actionable Insights using AI.</strong>
</p>

<p align="center">
  Built with MERN Stack • Google Gemini AI • Cloudinary • JWT Authentication
</p>

---

## 📖 Overview

HealthAI is a full-stack healthcare intelligence platform that helps users understand their medical reports effortlessly. The application leverages **Google Gemini AI** to analyze medical PDFs and images, generate structured summaries, explain technical terminology, and provide patient-friendly insights in multiple languages.

Instead of manually interpreting complex medical documents, users can upload reports and receive instant AI-powered analysis through a secure and intuitive dashboard.

---

## ✨ Features

### 🔐 Secure Authentication

* JWT-based authentication system
* Protected routes and private user data
* Secure login and registration flow

### 🤖 AI-Powered Report Analysis

* Upload medical reports in PDF or image format
* Automated report parsing using Google Gemini AI
* Easy-to-understand summaries and explanations
* Multi-language support for improved accessibility

### ☁️ Cloud-Based Storage

* Secure report storage with Cloudinary
* Fast file retrieval and management
* Automatic cleanup of deleted records

### 📊 Personal Health Dashboard

* Centralized report management
* View AI-generated insights anytime
* Track report history and analysis results

### 🗑️ Report Management

* Upload, view, and delete reports
* Synchronized deletion from MongoDB and Cloudinary
* Maintains database consistency and integrity

---

## 📸 Application Preview


###  Authentication

![Dashboard](Img/Authentication_Page.jpeg)

###  Dashboard

![Dashboard](Img/Dashboard.jpeg)

###  Dashboard With Reports

![Dashboard](Img/Dashboard_With_Reports.jpeg)

###  AI Report Analysis

![AI Analysis](Img/Report_Details_Page.jpeg)


---

## 🛠️ Tech Stack

### Frontend

* React.js / Next.js
* Tailwind CSS
* SweetAlert2

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose ODM

### AI & Cloud Services

* Google Gemini API
* Cloudinary

---

## 🏗️ System Architecture

```text
User Upload
     │
     ▼
Express API
     │
     ├── Cloudinary Storage
     │
     ├── Google Gemini AI
     │
     ▼
MongoDB Database
     │
     ▼
Personal Dashboard
```

---

## 🧠 Technical Highlights

### High-Performance File Processing

Implemented an in-memory processing pipeline using:

```javascript
multer.memoryStorage()
```

This eliminates unnecessary disk operations and enables:

* Faster upload handling
* Reduced server overhead
* Real-time AI processing
* Improved scalability

### Production-Ready Error Handling

#### Retry Mechanism

Custom retry logic for temporary Gemini API failures (503 responses).

#### Secure File Transmission

Migrated from public file URLs to direct buffer streaming, preventing unauthorized access and reducing security risks.

#### Robust Validation

Comprehensive frontend and backend validation with meaningful user feedback.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mayukhmondal42/healthcare.git
```

### 2. Install Dependencies

Backend:

```bash
cd server
npm install
```

Frontend:

```bash
cd client
npm install
```

### 3. Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key

JWT_SECRET=your_jwt_secret
```

### 4. Start Development Server

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## 🎯 Future Enhancements

* OCR support for handwritten prescriptions
* Health trend tracking and analytics
* Doctor-sharing functionality
* AI-powered medication explanations
* Mobile application support
* Voice-based report summaries

---

## 👨‍💻 Developer Notes

This project was built to explore the practical application of Generative AI in healthcare workflows while maintaining a secure, scalable, and user-friendly architecture.

Key focus areas:

* AI Integration
* System Security
* Performance Optimization
* Cloud Infrastructure
* User Experience

---

## ⭐ Support

If you found this project helpful, consider giving it a star on GitHub.

---

<p align="center">
  <strong>Built with ❤️ for the future of digital healthcare.</strong>
</p>
