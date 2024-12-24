import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for toast messages
import { API_URL } from '../utils/env';
import { getLocalStorage } from '../utils/localStorage'; // Import getLocalStorage utility function

const axiosInstance = axios.create({
  baseURL: API_URL,
});
// Function to set token in axios headers
const setToken = () => {
  const token = getLocalStorage('token');
  console.log(token);
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const createExam = createAsyncThunk('exam/createExam', async (examData) => {
  setToken(); // Set token before making the request
  try {
    console.log(examData);
    
    const response = await axiosInstance.post('/exams/', examData);
    toast.success('Exam created successfully'); // Show success toast message
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message); // Show error toast message
    throw new Error(error.response.data.message);
  }
});

export const takeExam = createAsyncThunk('exam/takeExam', async ({ email, examId }) => {
  setToken(); // Set token before making the request
  try {
    const response = await axiosInstance.post(`/exams/take/${examId}`, { email });
    toast.success('Exam taken successfully'); // Show success toast message
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message); // Show error toast message
    throw new Error(error.response.data.message);
  }
});

export const getExamResults = createAsyncThunk('exam/getExamResults', async (examId) => {
  setToken(); // Set token before making the request
  try {
    const response = await axiosInstance.get(`/exams/results/${examId}`);
    toast.success('Exam results fetched successfully'); // Show success toast message
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message); // Show error toast message
    throw new Error(error.response.data.message);
  }
});

export const getAllExams = createAsyncThunk('exam/getAllExams', async () => {
  setToken(); // Set token before making the request
  try {
    const response = await axiosInstance.get('/exams/all');
    toast.success('Exams fetched successfully'); // Show success toast message
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message); // Show error toast message
    throw new Error(error.response.data.message);
  }
});

const examSlice = createSlice({
  name: 'exam',
  initialState: {
    exams: [],
    currentExam: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Reducers for local state management
  },
  extraReducers: builder => {
    builder
      .addCase(createExam.fulfilled, (state, action) => {
        state.exams.push(action.payload);
        state.isLoading = false;
      })
      .addCase(takeExam.fulfilled, (state, action) => {
        state.currentExam = action.payload;
        state.isLoading = false;
      })
      .addCase(getExamResults.fulfilled, (state, action) => {
        state.currentExam = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllExams.fulfilled, (state, action) => {
        state.exams = action.payload.exams;
        state.isLoading = false;
      })
      .addCase(createExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(takeExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExamResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExam.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(takeExam.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getExamResults.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getAllExams.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default examSlice.reducer;
