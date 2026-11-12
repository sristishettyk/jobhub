require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const Application = mongoose.model("Application", {
    name: String,
    email: String,
    jobTitle: String,
    coverLetter: String
});
const Job = mongoose.model("Job", {
    title: String,
    company: String,
    location: String,
    type: String,
    description: String
});
const Profile = mongoose.model("Profile", {
    name: String,
    email: String,
    phone: String,
    skills: String,
    education: String,
    experience: String
});

app.get("/", (req, res) => {
    res.send("JobHub backend is running!");
});

app.post("/api/applications", async (req, res) => {
    console.log("POST ROUTE HIT");

    try {
        const { name, email, jobTitle, coverLetter } = req.body;

        console.log("Received application:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Job:", jobTitle);

        const application = new Application({
            name,
            email,
            jobTitle,
            coverLetter
        });

        await application.save();

        console.log("SAVED TO MONGODB:", application);

        res.json({
            message: "Application received successfully!"
        });

    } catch (error) {
        console.error("DATABASE SAVE ERROR:", error);

        res.status(500).json({
            message: "Application could not be submitted.",
            error: error.message
        });
    }
});
app.post("/api/jobs", async (req, res) => {
    console.log("JOB POST ROUTE HIT");

    try {
        const { title, company, location, type, description } = req.body;

        console.log("Received job:");
        console.log("Title:", title);
        console.log("Company:", company);
        console.log("Location:", location);

        const job = new Job({
            title,
            company,
            location,
            type,
            description
        });

        await job.save();

        console.log("JOB SAVED TO MONGODB:", job);

        res.json({
            message: "Job posted successfully!"
        });

    } catch (error) {
        console.error("JOB SAVE ERROR:", error);

        res.status(500).json({
            message: "Job could not be posted.",
            error: error.message
        });
    }
});
app.get("/api/jobs", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        console.error("JOB FETCH ERROR:", error);

        res.status(500).json({
            message: "Jobs could not be fetched.",
            error: error.message
        });
    }
});
app.post("/api/profiles", async (req, res) => {
    try {
        const { name, email, phone, skills, education, experience } = req.body;

        const profile = new Profile({
            name,
            email,
            phone,
            skills,
            education,
            experience
        });

        await profile.save();

        console.log("PROFILE SAVED TO MONGODB:", profile);

        res.json({
            message: "Profile created successfully!"
        });

    } catch (error) {
        console.error("PROFILE SAVE ERROR:", error);

        res.status(500).json({
            message: "Profile could not be created.",
            error: error.message
        });
    }
});
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);
    }
}

startServer();