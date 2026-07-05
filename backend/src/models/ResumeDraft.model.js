const mongoose = require('mongoose');

const resumeDraftSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  data: {
    type: Object, // We store the entire ResumeData structure here
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('ResumeDraft', resumeDraftSchema);
