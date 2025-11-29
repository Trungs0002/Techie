const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const { authenticate } = require("../middleware/auth");

// List questions (recent)
router.get("/", authenticate, questionController.listQuestions);

// Get random questions for quiz
router.get("/random", authenticate, questionController.getRandomQuestions);

// Create new question
router.post("/", authenticate, questionController.createQuestion);

module.exports = router;
