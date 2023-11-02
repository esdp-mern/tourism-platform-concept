import express from "express";
import Guide from "../models/Guide";


const guidesRouter = express.Router();

guidesRouter.get("/" , async (req, res) => {
    try {
        const guides = await Guide.find().populate({path: "user", select: "username , displayName"});
        return res.send(guides);
    } catch (e) {
        return res.status(500).send("Error");
    }
});

guidesRouter.get("/:id" , async (req, res) => {
   try {
       const id = req.params.id;
       const guide = await Guide.findById(id).populate({path: "user", select: "username , displayName"});

       return res.send(guide);
   } catch (e) {
       return res.status(500).send("Error");
   }
});

export default guidesRouter;