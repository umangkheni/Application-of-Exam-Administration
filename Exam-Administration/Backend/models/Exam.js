const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [{ type: Array, ref: 'Question' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Exam', examSchema);