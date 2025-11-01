const Subject = require('../models/Subject');

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
const getAllSubjects = async (req, res) => {
  try {
    const { isActive } = req.query;
    
    const query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const subjects = await Subject.find(query)
      .populate('createdBy', 'username fullName')
      .sort({ dateCreated: -1 });

    res.status(200).json({
      success: true,
      count: subjects.length,
      data: { subjects }
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching subjects'
    });
  }
};

// @desc    Get single subject
// @route   GET /api/subjects/:id
// @access  Public
const getSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('createdBy', 'username fullName');

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { subject }
    });
  } catch (error) {
    console.error('Get subject error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching subject'
    });
  }
};

// @desc    Create new subject
// @route   POST /api/subjects
// @access  Private
const createSubject = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    // Validation
    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and code'
      });
    }

    // Check if subject code already exists
    const existingSubject = await Subject.findOne({ code: code.toUpperCase() });
    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: 'Subject code already exists'
      });
    }

    // Create subject
    const subject = await Subject.create({
      name,
      code: code.toUpperCase(),
      description,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: { subject }
    });
  } catch (error) {
    console.error('Create subject error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating subject'
    });
  }
};

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private
const updateSubject = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Update fields
    if (name) subject.name = name;
    if (description !== undefined) subject.description = description;
    if (isActive !== undefined) subject.isActive = isActive;

    await subject.save();

    res.status(200).json({
      success: true,
      message: 'Subject updated successfully',
      data: { subject }
    });
  } catch (error) {
    console.error('Update subject error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating subject'
    });
  }
};

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    await subject.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    console.error('Delete subject error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting subject'
    });
  }
};

module.exports = {
  getAllSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject
};
