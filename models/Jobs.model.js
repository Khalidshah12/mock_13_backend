const mongoose = require('mongoose');

const jobsSchema = ({
    name: { type: String, required: true },
    position: { type: String, required: true },
    contract: { type: String, required: true },
    location: { type: String, required: true },
});

const JobsModel = mongoose.model('jobs', jobsSchema);

module.exports = { JobsModel };