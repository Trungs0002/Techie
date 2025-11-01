const express = require('express');
const router = express.Router();
const {
  getAllSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject
} = require('../controllers/subject.controller');
const { protect } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getAllSubjects);
router.get('/:id', getSubject);

// Protected routes
router.post('/', protect, createSubject);
router.put('/:id', protect, updateSubject);
router.delete('/:id', protect, deleteSubject);

module.exports = router;
