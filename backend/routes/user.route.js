const { Router } = require("express");
const userRouter = Router();
const { UserModel } = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.json({ msg: error });
    }
})


userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hashed_pass) => {
            if (err) {
                res.send("Something went wrong");
                console.log(err);
            } else {
                const user = new UserModel({ name, email, pass: hashed_pass });
                await user.save();
                res.json("User has been registered");
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ msg: error });
    }
});


userRouter.post("/login", async (req, res) => {
    const { email, pass} = req.body;
    const user = await UserModel.findOne({ email });
    try {
        if (user) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (err) {
                    res.status(500).send("Something went wrong");
                    console.log(err);
                } else {
                    if (result) {
                        const token = jwt.sign({ _id: user._id }, process.env.key);
                        res.json({ msg: "Login Successfull", token });
                    } else {
                        res.status(401).json("Wrong Credentials");
                    }
                }
            })
        } else {
            res.status(404).json("User Not found");
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: error });
    }
});




module.exports = { userRouter };