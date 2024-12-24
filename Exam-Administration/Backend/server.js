// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exams');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));