import express from 'express';
import Tour from '../models/Tour';
import Review from '../models/Review';

const toursRouter = express.Router();

toursRouter.get('/', async (req, res) => {
  try {
    if (req.query.guide) {
      const guidesTours = await Tour.find({ guid: req.query.guide });

      return res.send(guidesTours);
    }

    const allTours = await Tour.find();
    return res.send(allTours);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

toursRouter.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).send('Not found!');
    }

    const reviews = await Review.findOne({ tour: tour._id }).populate(
      'commentTour',
      'ratingTour',
    );
    if (!reviews) {
      return res.status(404).send('Not found!');
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
      commentTour: reviews.commentTour,
      ratingTour: reviews.ratingTour,
    };
    return res.send(tourReviews);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

export default toursRouter;
