import express from 'express';
import Tour from '../models/Tour';
import Review from '../models/Review';
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import mongoose from "mongoose";
import Guide from "../models/Guide";
import {upload} from "../multer";

const toursRouter = express.Router();

toursRouter.get('/', async (req, res) => {
  try {
    let tours;

    if (req.query.guide) {
      tours = await Tour.find({guid: req.query.guide, isPublished: true });
    } else {
      tours = await Tour.find();
    }

    const formattedTours = await Promise.all(
        tours.map(async (tour) => {
          const reviews = await Review.find({ tour: tour._id });
          return {
            _id: tour._id,
            guide: tour.guide,
            name: tour.name,
            mainImage: tour.mainImage,
            description: tour.description,
            category: tour.category,
            price: tour.price,
            duration: tour.duration,
            plan: tour.plan,
            destination: tour.destination,
            arrival: tour.arrival,
            departure: tour.departure,
            dressCode: tour.dressCode,
            included: tour.included,
            country: tour.country,
            galleryTour: tour.galleryTour,
            isPublished: tour.isPublished,
            reviews: reviews,
          };
        })
    );

    return res.send(formattedTours);
  } catch (e) {
    return res.status(500).send('Error');
  }
});


toursRouter.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate({
      path: 'guide',
      populate: {
        path: 'user',
        select: 'username displayName',
      },
    });

    if (!tour) {
      return res.status(404).send('Not found!');
    }

    let rating = 0;

    const reviews = await Review.find({ tour: tour._id });

    if (reviews.length > 0) {
      rating =
        reviews.reduce((acc, value) => acc + value.rating, 0) / reviews.length;
    }

    const tourReviews = {
      _id: tour._id,
      guide: tour.guide,
      name: tour.name,
      mainImage: tour.mainImage,
      description: tour.description,
      category: tour.category,
      price: tour.price,
      duration: tour.duration,
      plan: tour.plan,
      destination: tour.destination,
      arrival: tour.arrival,
      departure: tour.departure,
      dressCode: tour.dressCode,
      included: tour.included,
      country: tour.country,
      galleryTour: tour.galleryTour,
      isPublished: tour.isPublished,
      commentTour: reviews,
      ratingTour: rating,
    };
    return res.send(tourReviews);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

toursRouter.post('/', auth, permit('admin'), upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'galleryTour', maxCount: 10 }]), async (req, res, next) => {
  try {
    const guidePromises = req.body.guide.map(async (guideId: string) => await Guide.findById(guideId));
    const guides = await Promise.all(guidePromises);

    if (guides.some((guide) => !guide)) {
      return res.status(404).send('One or more guides do not exist');
    }

    const guide = guides.map((guide) => guide._id);
    const mainImage = req.files && 'mainImage' in req.files ? req.files['mainImage'][0].filename : null;
    const gallery = req.files && 'galleryTour' in req.files ? req.files['galleryTour'].map((file: Express.Multer.File) => file.filename) : [];

    const tour = new Tour({
      guide: guide,
      name: req.body.name,
      mainImage: mainImage,
      description: req.body.description,
      category: req.body.category,
      price: parseFloat(req.body.price),
      duration: req.body.duration,
      plan: req.body.plan,
      destination: req.body.destination,
      arrival: req.body.arrival,
      departure: req.body.departure,
      dressCode: req.body.dressCode,
      included: req.body.included,
      galleryTour: gallery,
      country: req.body.country,
    });

    await tour.save();
    return res.send(tour);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default toursRouter;
