const express = require('express');
const Skill = require('../models/Skill');
const { verifyToken } = require('../middleware/auth');
const axios = require('axios');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const { name, level } = req.body;

        const newSkill = new Skill({
            student: req.user.id,
            name,
            level
        });

        await newSkill.save();
        res.status(201).json(newSkill);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const skills = await Skill.find({ student: req.user.id });
        res.status(200).json(skills);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



router.post('/assess', verifyToken, async (req, res) => {
    try {
        const { target_role } = req.body;
        const skills = await Skill.find({ student: req.user.id });
        const skillNames = skills.map(s => s.name);

        const response = await axios.post('http://127.0.0.1:5001/analyze', {
            skills: skillNames,
            target_role
        });

        res.status(200).json(response.data);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/roadmap', verifyToken, async (req, res) => {
    try {
        const { target_role } = req.body;
        const skills = await Skill.find({ student: req.user.id });
        const skillNames = skills.map(s => s.name);

        const response = await axios.post('http://127.0.0.1:5001/roadmap', {
            skills: skillNames,
            target_role
        });

        res.status(200).json(response.data);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;