🏥 HealthAI — Your Intelligent Wellness Partner

<p align="center"><strong>Transforming Complex Medical Reports into Clear, Actionable Insights using AI.</strong></p>

<p align="center">
🌐 <b>Live:</b> https://client-tau-rosy-50.vercel.app/ <br/>
📂 <b>GitHub:</b> https://github.com/mayukhmondal42/healthcare
</p>

📖 Overview
HealthAI is a full-stack AI-powered healthcare platform that helps users understand their medical reports. Users upload lab reports (PDF/Image) to their private vault and get instant AI insights powered by Google Gemini.

From your live site:
- Upload Reports - Securely store and manage lab results
- AI-Powered Analysis - Actionable, AI-driven summaries
- Track Your Health - Visual timeline of health metrics

🏗️ Architecture

Express API
 |
 |----> Cloudinary Storage
 |
 |----> Google Gemini AI
 |
 v
MongoDB Database
 |
 v
Personal Dashboard

🧠 Technical Highlights

High-Performance File Processing
Implemented an in-memory processing pipeline using:

`multer.memoryStorage()`

This eliminates unnecessary disk operations and enables:
- Faster upload handling
- Reduced server overhead
- Real-time AI processing
- Improved scalability

🔗 Production-Ready Error Handling

*Retry Mechanism*
Custom retry logic for temporary Gemini API failures (503 responses).

*Secure File Transmission*
Migrated from public file URLs to secure buffer-based streaming to Gemini API. Prevents unauthorized access and ensures privacy.

*Synchronized Deletion*
When a report is deleted, it is removed from both MongoDB and Cloudinary to maintain data consistency.

🛠️ Tech Stack
*Frontend:* http://React.js, Tailwind CSS, Axios, React Router
*Backend:* http://Node.js, http://Express.js, Multer
*Database:* MongoDB, Mongoose
*AI & Cloud:* Google Gemini API, Cloudinary
*Auth:* JWT, Bcrypt
*Deployment:* Vercel

🚀 Getting Started
*Clone:* git clone https://github.com/mayukhmondal42/healthcare.git
*Install:* cd server && npm install | cd../client && npm install
*Run:* npm run dev

👨‍💻 Author
*Mayukh Mondal*
GitHub: https://github.com/mayukhmondal42
Live: https://client-tau-rosy-50.vercel.app/
Kolkata, West Bengal, India
