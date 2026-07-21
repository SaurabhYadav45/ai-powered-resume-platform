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

## 🚀 Comprehensive Features & Functionality

### 📊 Comprehensive AI-Powered Analysis Dashboard
Get an extremely detailed, visually rich breakdown of your resume's performance, featuring:
- **Overall Assessment & Recommendations**: A quick pulse check (e.g., "79% Good") with high-level advice on where to focus improvements.
- **Detailed Scoring Metrics**: Fine-grained, color-coded scores across multiple dimensions including **ATS Score**, **Impact**, **Action Verbs**, **Relevance**, **Length**, **Metrics Usage**, and **Readability**.
- **Keyword Analysis**: Visual charts showing the frequency of critical technical and soft skills (e.g., React, AWS, Next.js) found in your resume.
- **Industry Benchmark Comparison**: Compare your Skills Match, ATS Score, and Impact Score side-by-side against industry averages to see exactly where you stand.
- **Missing Critical Skills**: Instantly identifies high-value skills required by your target job description that are completely missing from your resume.
- **Formatting Feedback**: Actionable advice on section alignment, font consistency, and ATS-friendly formatting structure.
- **Improvement Suggestions**: Concrete, bite-sized recommendations to enhance bullet points, tailor your summary, and optimize keywords.
- **ATS Optimization Tips**: Specific, contextual tips directly related to the target job description (e.g., "Incorporate 'AWS' from job description").
- **Red Flags to Fix**: Automatically detects cliché buzzwords or unquantified bullet points and provides immediate, inline suggestions (e.g., 💡 "Add how many active users or features built").

### 📝 AI Resume Builder & Templates
- **Multiple Professionally Designed Templates**: Choose from a variety of visually striking, ATS-optimized templates (Modern, Traditional, Simple, Creative) to perfectly match your industry and style.
- **Smart Resume Builder**: Generate a professional resume from scratch. Input raw details, and the AI will craft structured, punchy content.
- **AI Text Improvement**: Automatically rewrite and enhance individual bullet points or professional summaries to be more impactful using strong action verbs.
- **Real-time Preview**: See changes to your resume in real-time as you build it. 
- **Draft Auto-Saving**: Never lose your progress. Your resume drafts are securely auto-saved to your account while you edit.
- **Export to High-Quality PDF**: Download your polished, newly built resume as a clean, properly formatted PDF.

### ✉️ Cover Letter Generation
- **One-Click Tailored Cover Letters**: Instantly generate a highly personalized, compelling cover letter that perfectly bridges your resume's achievements with the target job description.

### 🔐 User Dashboard & Credit System
- **Secure Authentication**: Full JWT-based authentication system allowing users to safely sign up and log in.
- **History Tracking**: Automatically saves all your past resume analyses so you can track improvements over time and revisit old feedback.
- **Credit & Pro System**: Free users start with 5 complimentary credits for analysis. A scalable Pro tier offers extended/unlimited access.

### 💻 Modern & Responsive UI
- **Premium Glassmorphism Design**: A beautiful, user-friendly interface with sleek glassmorphism effects, smooth micro-animations, and dynamic visual data representation (Skill charts, Score Cards).
- **Mobile-Friendly**: Fully responsive and optimized for seamless use on any device, built with Next.js and Tailwind CSS.

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
- An OpenAI API Key

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