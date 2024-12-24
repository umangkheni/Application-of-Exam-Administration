const Exam = require('../models/Exam');
const Question = require('../models/Question');

const createExam = async (req, res) => {
    try {
        const { title, description, questions } = req.body;
        const newExam = new Exam({
            title,
            description,
            questions,
        });
        await newExam.save();
        res.status(201).json({ message: 'Exam created successfully', exam: newExam });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const takeExam = async (req, res) => {
    try {
        const { examId, answers } = req.body;
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        let score = 0;
        for (let i = 0; i < exam.questions.length; i++) {
            if (exam.questions[i].answer === answers[i]) {
                score++;
            }
        }
        const result = {
            examId,
            score,
            totalQuestions: exam.questions.length,
        };
        res.status(200).json({ message: 'Exam taken successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const getResults = async (req, res) => {
    try {
        const { examId } = req.params;
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        const userAnswers = req.body.answers;
        let correctAnswers = 0;
        exam.questions.forEach((question, index) => {
            if (question.answer === userAnswers[index]) {
                correctAnswers++;
            }
        });
        const result = {
            examId,
            score: correctAnswers,
            totalQuestions: exam.questions.length,
        };
        res.status(200).json({ message: 'Results fetched successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json({ message: 'Exams fetched successfully', exams });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = { createExam, takeExam, getResults, getAllExams };