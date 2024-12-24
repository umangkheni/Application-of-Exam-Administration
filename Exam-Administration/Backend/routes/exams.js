const express = require('express');
const { createExam, takeExam, getResults, getAllExams } = require('../controllers/examController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createExam);
router.post('/take/:examId', authMiddleware, takeExam);
router.get('/results/:examId', authMiddleware, getResults);
router.get('/all', authMiddleware, getAllExams);

module.exports = router;