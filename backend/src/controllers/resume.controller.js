/**
 * resume.controller.js (Updated)
 * @description Controller for handling resume analysis, history, and cover letter generation.
 */

const jwt = require('jsonwebtoken');
const parseResume = require('../utils/parseResume');
const aiAnalysis = require('../utils/aiAnalysis');
const Analysis = require('../models/Analysis.model');
const ResumeDraft = require('../models/ResumeDraft.model');

const resumeController = {
  analyze: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No resume file was uploaded.' });
      }
      console.log(`--- [Controller] Received file: ${req.file.originalname} (${req.file.mimetype}) ---`);

      const resumeText = await parseResume.getText(req.file);
      if (!resumeText || !resumeText.trim()) {
        return res.status(400).json({ message: 'Could not extract text from the resume.' });
      }

      // 1. Check Credits before proceeding
      const user = req.user; // Available because of 'protect' middleware
      let currentCredits = user.credits !== undefined ? user.credits : 5;

      if (!user.isPro && currentCredits <= 0) {
        return res.status(403).json({ message: 'Insufficient credits. Please upgrade your plan to analyze more resumes.' });
      }

      // 2. Perform Analysis
      const { jobDescription } = req.body;
      const analysisResult = await aiAnalysis.analyze(resumeText, jobDescription);

      // 3. Deduct Credit and Save History
      if (!user.isPro) {
        user.credits = currentCredits - 1;
        await user.save();
      }

      await Analysis.create({
        user: user._id,
        analysisResult: analysisResult,
        fileName: req.file.originalname,
      });
      console.log(`--- [Controller] Analysis saved for user: ${user._id}. Remaining credits: ${user.credits} ---`);

      // We'll also send back the extracted resume text to the frontend
      // so we can use it for the cover letter generation without a second upload.
      res.status(200).json({ analysisResult, resumeText });

    } catch (error) {
      console.error('--- [Controller] An error occurred during analysis: ---', error);
      res.status(500).json({ message: error.message || 'An internal server error occurred.' });
    }
  },

  getHistory: async (req, res) => {
    try {
      const analyses = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
      res.status(200).json(analyses);
    } catch (error) {
      console.error('--- [History Error] ---', error);
      res.status(500).json({ message: 'Server error while fetching analysis history.' });
    }
  },

  /**
   * @async
   * @function generateCoverLetter
   * @description Generates a cover letter using the AI.
   */
  generateCoverLetter: async (req, res) => {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ message: 'Resume text and job description are required.' });
    }

    try {
      // We will call a new method in our aiAnalysis utility
      const coverLetter = await aiAnalysis.generateCoverLetter(resumeText, jobDescription);
      res.status(200).json({ coverLetter });
    } catch (error) {
      console.error('--- [Cover Letter Error] ---', error);
      res.status(500).json({ message: 'Server error while generating cover letter.' });
    }
  },

  buildResume: async (req, res) => {
    const userData = req.body;
    if (!userData) {
      return res.status(400).json({ message: 'User data is required.' });
    }
    try {
      const polishedContent = await aiAnalysis.buildResumeContent(userData);
      res.status(200).json({ polishedContent });
    } catch (error) {
      console.error('--- [Resume Builder Error] ---', error);
      res.status(500).json({ message: 'Server error while building resume.' });
    }
  },

  getDraft: async (req, res) => {
    try {
      const draft = await ResumeDraft.findOne({ user: req.user._id });
      if (!draft) {
        return res.status(404).json({ message: 'No saved draft found.' });
      }
      res.status(200).json({ data: draft.data });
    } catch (error) {
      console.error('--- [Get Draft Error] ---', error);
      res.status(500).json({ message: 'Server error while fetching resume draft.' });
    }
  },

  saveDraft: async (req, res) => {
    try {
      const { data } = req.body;
      if (!data) {
        return res.status(400).json({ message: 'Draft data is required.' });
      }

      // Find and update if exists, otherwise create new
      let draft = await ResumeDraft.findOne({ user: req.user._id });
      if (draft) {
        draft.data = data;
        await draft.save();
      } else {
        draft = await ResumeDraft.create({
          user: req.user._id,
          data: data
        });
      }

      res.status(200).json({ message: 'Draft saved successfully.', draftId: draft._id });
    } catch (error) {
      console.error('--- [Save Draft Error] ---', error);
      res.status(500).json({ message: 'Server error while saving resume draft.' });
    }
  },

  improveText: async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: 'Text is required to improve.' });
      }

      const improved = await aiAnalysis.improveText(text);
      res.status(200).json({ improved });
    } catch (error) {
      console.error('--- [Improve Text Error] ---', error);
      res.status(500).json({ message: 'Server error while improving text.' });
    }
  }
};

module.exports = resumeController;
