const mongoose = require('mongoose');

const userSchema = ({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
});

const UserModel = mongoose.model('users', userSchema);
module.exports = { UserModel };
