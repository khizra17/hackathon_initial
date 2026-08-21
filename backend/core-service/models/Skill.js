const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);