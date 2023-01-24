const express = require('express');
const { JobsModel } = require('../models/Jobs.model');
require('dotenv').config();
const jobsRouter = express.Router();

jobsRouter.get('/', async (req, res) => {
    try {
        const jobs = await JobsModel.find();
        res.send(jobs);
    } catch (e) {
        res.send({ Error: "Something Went Wrong, Please Try Again Later" });
    }
})

jobsRouter.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const jobs = new JobsModel(data);
        await jobs.save();
        res.send({ msg: 'Posted Successfully' });
    } catch (e) {
        res.status(500).send({ Error: "Something Went Wrong, Please Try Again Later" });
    };
});

jobsRouter.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await JobsModel.findByIdAndDelete({ _id: id });
        res.send("Deleted Successfully");
    } catch (e) {
        res.send({ Error: "Something Went Wrong, Please Try Again Later" });
    };
});

module.exports = { jobsRouter };
