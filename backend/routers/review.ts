import express from 'express';
import Review from '../models/Review';
import mongoose from 'mongoose';

const reviewRouter = express.Router();

reviewRouter.get('/', async (req, res) => {
  try {
    if (req.query.tourID) {
      const reviews = await Review.find({ tour: req.query.tourID });
      return res.send(reviews);
    }

    if (req.query.guideID) {
      const reviews = await Review.find({ guide: req.query.guideID });
      return res.send(reviews);
    }

    const reviews = await Review.find();
    return res.send(reviews);
  } catch (e) {
    return res.status(500).send(e);
  }
});

reviewRouter.post('/', async (req, res, next) => {
  try {
    const review = new Review({
      user: req.body.user,
      tour: req.body.tour ? req.body.tour : null,
      guide: req.body.guide ? req.body.guide : null,
      comment: req.body.comment,
      rating: req.body.rating,
    });

    await review.save();
    return res.send(review);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default reviewRouter;
