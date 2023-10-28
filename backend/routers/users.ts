import express from "express";
import User from "../models/User";
import mongoose from "mongoose";
import {randomUUID} from "crypto";
import auth, {RequestWithUser} from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            displayName: req.body.displayName,
        });

        user.generateToken();

        await user.save();
        return res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});


usersRouter.delete("/sessions", auth, async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;
        user.token = randomUUID();
        await user.save();
        res.send({ message: "Logout successful, token has been refreshed" });
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

export default usersRouter;
