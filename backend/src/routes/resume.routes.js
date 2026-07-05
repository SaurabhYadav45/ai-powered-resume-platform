/**
 * resume.routes.js (Updated)
 * @description Defines the API routes for resume-related endpoints.
 */

const express = require('express');
const multer = require('multer');
const resumeController = require('../controllers/resume.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// --- Multer Configuration (remains the same) ---
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DOCX, JPG, and PNG files are allowed."), false);
    }
  }
});

// --- Route Definitions ---

// @route   POST /api/resume/analyze
// @desc    Analyze a resume. Saves history if user is logged in.
// @access  Private
router.post('/analyze', protect, upload.single('resume'), resumeController.analyze);

// @route   GET /api/resume/history
// @desc    Get the analysis history for the logged-in user.
// @access  Private
router.get('/history', protect, resumeController.getHistory);

// @route   POST /api/resume/generate-cover-letter
// @desc    Generate a cover letter based on resume text and a job description.
// @access  Private
router.post('/generate-cover-letter', protect, resumeController.generateCoverLetter);

// @route   GET /api/resume/draft
// @desc    Get the saved resume draft for the logged-in user
// @access  Private
router.get('/draft', protect, resumeController.getDraft);

// @route   POST /api/resume/draft
// @desc    Save the resume draft for the logged-in user
// @access  Private
router.post('/draft', protect, resumeController.saveDraft);

// @route   POST /api/resume/build
// @desc    Generate professional resume content from raw data
// @access  Private
router.post('/build', protect, resumeController.buildResume);

// @route   POST /api/resume/improve-text
// @desc    Improve a single line of resume text via AI
// @access  Private
router.post('/improve-text', protect, resumeController.improveText);

module.exports = router;
