const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/User.model');
require('dotenv').config();
const usersRouter = express.Router();

usersRouter.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const users = await UserModel.find({ email });

        if (users.length > 0) {
            res.status(400).send({ Error: "Already have an account, Please try to login" });
        } else {
            bcrypt.hash(password, 4, async function (err, hash) {
                if (hash) {
                    if (email.includes('@masaischool.com')) {
                        const user = new UserModel({ email, password: hash, isAdmin: false, role: 'admin' });
                        await user.save();
                    } else {
                        const user = new UserModel({ email, password: hash, isAdmin: false });
                        await user.save();
                    }
                    res.send({ msg: "Signup Successfull" });
                } else {
                    console.log(err)
                    res.status(400).send({ Error: "Something went wrong" })
                }
            });
        }

    } catch (e) {
        res.status(400).send({ Error: "Something went wrong" });
    }
})

usersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ userID: user[0]._id }, 'khalid');
                    res.send({ msg: "Login Successfull", token: token, username: user[0].name, role: user[0].role });
                } else {
                    res.status(400).send({ Error: 'email or password wrong' });
                }
            });
        } else {
            res.status(400).send({ Error: "Try login again" })
        }
    } catch (e) {
        res.status(400).send({ Error: "Something went wrong" });
    }
});

module.exports = { usersRouter };