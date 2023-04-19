require('../config/database');

const express = require('express');
const cors = require('cors');
const Path = require('path');
const app = express();
app.use(express.json());

const userRoutes = require('../routes/userRoutes');
app.use('/api/user', userRoutes);

const categoryRoutes = require('../routes/categoryRoutes');
app.use('/api/category', categoryRoutes);

const carRoutes = require('../routes/carRoutes');
app.use('/api/car', carRoutes);

const bookingRoutes = require('../routes/bookingRoutes');
app.use('/api/booking', bookingRoutes);

// const authRoutes = require('../routes/authRoutes');
// app.use('/api/user', authRoutes);

module.exports = app;
