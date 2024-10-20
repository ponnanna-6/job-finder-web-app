const mongoose = require('mongoose')
const UserModel = require('./user.schema')
const schema = mongoose.Schema

const jobSchema = new schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum : ["Internship", "Full-Time", "Part-Time"]
    },
    remote: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    skills: {
        type:[String],
        required: true
    },
    information: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
})

const Job = mongoose.model('Jobs', jobSchema)

module.exports = Job