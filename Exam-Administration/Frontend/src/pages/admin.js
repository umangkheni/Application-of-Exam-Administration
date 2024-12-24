import { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'tailwindcss/tailwind.css';
import { createExam } from '../redux/examSlice';

const AdminPage = () => {
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]); // Initialize with one question object
    const [title, setTitle] = useState(''); // Added title state
    const [description, setDescription] = useState(''); // Added description state
    const dispatch = useDispatch(); // Added useDispatch hook

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (index, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[index].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = value;
        setQuestions(newQuestions);
    };

    const handleTitleChange = (value) => {
        setTitle(value); // Added title change handler
    };

    const handleDescriptionChange = (value) => {
        setDescription(value); // Added description change handler
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]); // Add a new question object
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Prepare exam data for submission
        const examData = {
            title,
            description, // Added description to examData
            questions,
        };
        // Dispatch createExam action
        dispatch(createExam(examData));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-full mx-auto p-4 bg-gray-100 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Page</h1>
            <div className="mb-4">
                <span className="text-lg text-gray-700">Title:</span>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Title"
                    className="form-control bg-white text-gray-800 border border-gray-300 rounded-md py-2 px-4 block w-full mt-1"
                />
            </div>
            <div className="mb-4">
                <span className="text-lg text-gray-700">Description:</span>
                <textarea
                    value={description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Description"
                    className="form-control bg-white text-gray-800 border border-gray-300 rounded-md py-2 px-4 block w-full mt-1"
                />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Questionnaire</h2>
            {questions.map((question, index) => (
                <div key={index} className="mb-8 rounded-lg border border-gray-300 p-4">
                    <div className="mb-4">
                        <span className="text-lg text-gray-700">Question {index + 1}:</span>
                        <input
                            type="text"
                            value={question.question}
                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                            placeholder={`Question ${index + 1}`}
                            className="form-control bg-white text-gray-800 border border-gray-300 rounded-md py-2 px-4 block w-full mt-1"
                        />
                    </div>
                    <div>
                        {question.options.map((option, optionIndex) => (
                            <div className="mb-4" key={optionIndex}>
                                <span className="text-lg text-gray-700">Option {optionIndex + 1}:</span>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                    placeholder={`Option ${optionIndex + 1}`}
                                    className="form-control bg-white text-gray-800 border border-gray-300 rounded-md py-2 px-4 block w-full mt-1"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <span className="text-lg text-gray-700">Answer:</span>
                        <input
                            type="text"
                            value={question.answer}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            placeholder="Answer"
                            className="form-control bg-white text-gray-800 border border-gray-300 rounded-md py-2 px-4 block w-full mt-1"
                        />
                    </div>
                </div>
            ))}
            <div className="mb-4">
                <button type="button" onClick={addQuestion} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Another Question</button>
            </div>
            <div className="mb-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>
        </form>
    );
};

export default AdminPage;
