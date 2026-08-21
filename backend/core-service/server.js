const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const skillRoutes = require('./routes/skills');
app.use('/api/skills', skillRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('SkillForge backend is running');
});



const PORT = process.env.PORT || 5000;

const { verifyToken, requireRole } = require('./middleware/auth');

app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'You accessed a protected route', user: req.user });
});

app.get('/api/admin-only', verifyToken, requireRole('admin'), (req, res) => {
    res.json({ message: 'Welcome, admin', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});