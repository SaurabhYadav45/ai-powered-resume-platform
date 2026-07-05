# AI-Powered Resume Analyzer & Builder

A full-stack web application that leverages generative AI to provide instant, detailed feedback on your resume and offers a powerful resume builder to create professional resumes, helping you stand out in the job market and land your dream job.

---

### Live Link : https://my-resume-analyzer.vercel.app

## Screenshots

| Home Page | Results Dashboard |
|----------------------|-----------------|
| <img width="100%" alt="Home Page" src="https://github.com/user-attachments/assets/ea82d9c5-1554-4237-9b88-4c720a022c76?text=Home+Page" /> | <img width="100%" alt="Results Dashboard" src="https://github.com/user-attachments/assets/a4188245-5006-4dd1-825a-09fa7caf06a1?text=Template+Page" /> |
| Login Page | Upload & Analyze Page |
|-----------------------|----------------------|
| <img width="100%" alt="Login Paget" src="https://github.com/user-attachments/assets/d472588f-e34d-46ce-9871-e1d113a00ab4?text=Result+Dashboard" /> | <img width="100%" alt="upload Page" src="https://github.com/user-attachments/assets/b5d3cc41-e6cb-4f7d-b913-eaa8ec6d9994" /> |
---

## Features

- **Instant AI Feedback:** Get a comprehensive analysis of your resume's content, formatting, and keyword optimization powered by the Google Gemini API.  
- **Job Description Matching:** Paste a job description to receive a "Skills Match" score, identifying how well your resume is tailored for a specific role.  
- **Actionable Suggestions:** Receive concrete, actionable advice on how to improve your resume, from quantifying achievements to using stronger action verbs.  
- **Secure User Accounts:** Full authentication system allows users to sign up and log in to save their analysis history.  
- **Track Your Progress:** Logged-in users can view a history of their past analyses, making it easy to see how their resume improves over time.  
- **Downloadable PDF Reports:** Save a professional-looking PDF of any analysis report for offline reference.  
- **Modern Resume Builder:** Create professional resumes with customizable templates, themes, and fonts.  
- **Multiple Templates:** Choose from various professionally designed resume templates (Modern, Traditional, Simple, Creative).  
- **Real-time Preview:** See changes to your resume in real-time as you build it.  
- **Export to PDF:** Download your created resume as a high-quality PDF document.  
- **Modern & Responsive UI:** A clean, intuitive, and mobile-friendly interface built with Next.js and Tailwind CSS.  

---

## Tech Stack

| Frontend | Backend |
|----------|---------|
| **Framework:** Next.js | **Framework:** Express.js |
| **Styling:** Tailwind CSS | **Database:** MongoDB + Mongoose |
| **State Management:** React Hooks & Context | **Authentication:** JWT, bcryptjs |
| **Form Handling:** React Hook Form + Zod | **File Handling:** Multer |
| **API Calls:** Axios | **Text Extraction:** pdf-parse, mammoth.js |
| **PDF Generation:** jsPDF, html2canvas | **AI Integration:** OpenAI API |

---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js (v22 or later)  
- A free MongoDB Atlas account  
- A Google Gemini API Key  

### Backend Setup

#### 1. Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
```
#### 2. Create a .env file and add your credentials:
```bash
PORT=5001
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

#### 3. Run the server:
```bash
npm run dev
```
#### Frontend Setup

#### 1. In a new terminal, navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

#### 2. Run the development server:
```bash
npm run dev
```

3. The application will be available at http://localhost:3000