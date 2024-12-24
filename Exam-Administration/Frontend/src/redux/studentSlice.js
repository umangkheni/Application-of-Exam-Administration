import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for toast messages
import { API_URL } from '../utils/env';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const register = createAsyncThunk('student/register', async (studentData) => {
  try {
    const response = await axiosInstance.post('/auth/register', studentData);
    toast.success('User registered successfully'); // Show success toast message
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message); // Show error toast message
    throw new Error(error.response.data.message);
  }
});

export const login = createAsyncThunk('student/login', async (email) => {
  try {
    const response = await axiosInstance.post('/auth/login', email);
    toast.success('Logged in successfully'); // Show success toast message
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message); // Show error toast message
    throw new Error(error.response.data.message);
  }
});

export const submitExam = createAsyncThunk('student/submitExam', async ({ email, result }) => {
  try {
    const response = await axiosInstance.post('/exams/submitExam', { email, result });
    toast.success('Exam submitted successfully'); // Show success toast message
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message); // Show error toast message
    throw new Error(error.response.data.message);
  }
});

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    currentStudent: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Reducers for local state management
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentStudent = action.payload;
        state.isLoading = false;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        const student = state.students.find(student => student.email === action.payload.email);
        if (student) {
          student.examResults.push(action.payload.result);
        }
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default studentSlice.reducer;
