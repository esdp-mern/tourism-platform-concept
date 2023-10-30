import express from "express";
import Tour from "../models/Tour";

const toursRouter = express.Router();

toursRouter.get("/", async (req, res) => {
   try {
       if(req.query.guide) {
           const guidesTours = await Tour.find({ guid: req.query.guide })

           return res.send(guidesTours);
       }

       const allTours = await Tour.find();
       return res.send(allTours);
   } catch (e) {
       return res.status(500).send('Error');
   } 
});

toursRouter.get("/:id", async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).send('Not found!');
        }

        return res.send(tour);
    } catch (e) {
        return res.status(500).send('Error');
    }
});

export default toursRouter;