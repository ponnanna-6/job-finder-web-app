const express = require('express');
const Job = require('../schemas/job.schema');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth');
const { isAuth } = require('../utils/utils');

router.post('/create',authMiddleware, async (req, res) => {
    const { name, logo, position, salary, jobType, remote, description, about, skills, information } = req.body;
    const user = req.user

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

router.get('/' ,async (req, res) => {
    try {
        const allJobs = isAuth(req) ? await Job.find({}) : await Job.find({}).select('-_id -__v -creator')
        res.status(200).json(allJobs);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error});
    }
});

router.get('/:id' ,async (req, res) => {
    try {
        const {id} = req.params
        const job = isAuth(req) 
            ? await Job.findById(id) 
            : await Job.findById(id).select('-_id -__v -creator')

        if(!job){
            return res.status(400).json({message: "Job not found for id: "+ id});
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error});
    }
});

router.delete('/:id', authMiddleware, async(req, res) => {
    const {id} = req.params
    try{
        const job = await Job.findById(id)
        if(!job){
            return res.status(400).json({message: "Job not found!"});
        }
        if(job.creator.toString() !== req.user.toString()){
            return res.status(400).json({message: "User not authorized to delete!"});
        }
        await Job.findByIdAndDelete(id)
        res.status(200).json({message: "Job deleted successfully!", creator: job.creator, user: req.user});
    } catch (error) {
        console.log(req.user)
        res.status(500).json({ message: "Internal server error", error: error});
    }
})

router.put('/:id',authMiddleware, async (req, res) => {
    try {    
        const { name, logo, position, salary, jobType, remote, description, about, skills, information } = req.body;
        const {id} = req.params
        const job = await Job.findById(id)
        if(!job){
            return res.status(400).json({message: "Job not found for id: "+ id});
        }
        
        if(job.creator.toString() !== req.user.toString()){
            return res.status(400).json({message: "User not authorized to update!"});
        }
        const updatedJob = await Job.findByIdAndUpdate(id, { name, logo, position, salary, jobType, remote, description, about, skills, information}, {new: true})
        res.status(200).json({ message: "Job updated successfully!", job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
});

module.exports = router;