const express = require('express');
const Job = require('../schemas/job.schema');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth')

router.post('/create',authMiddleware, async (req, res) => {
    const { name, logo, position, salary, jobType, remote, description, about, skills, information } = req.body;
    const user = req.user
    console.log(name, logo, position, salary, jobType, remote, description, about, skills, information);
    console.log(user)

    if (!name || !logo || !position || !salary || !jobType || remote === undefined || !description || !about || !skills || !information) {
        return res.status(400).json({ message: "All fields are mandatory!" });
    }

    try {
        const newJob = new Job({ name, logo, position, salary, jobType, remote, description, about, skills, information, creator:user});
        await newJob.save();
        res.status(200).json({ message: "Job created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
});

router.get('/', authMiddleware ,async (req, res) => {
    try {
        const allJobs = await Job.find({}).select('-_id -__v')
        res.status(200).json(allJobs);
    } catch (error) {
        console.error("Error finding job:", error);
        res.status(500).json({ message: "Internal server error", error: error});
    }
});

module.exports = router;