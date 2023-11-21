import express from 'express';
import Guide from '../models/Guide';

const guidesRouter = express.Router();

guidesRouter.get('/', async (req, res) => {
  try {
    const guides = await Guide.find().populate({
      path: 'user',
      select: 'username , displayName',
    });

    // const guidesWithRating = guides.map(async (guide) => {
    //   let rating = 0;
    //   const guideReviews = await TourReview.find({ guide: guide._id });
    //
    //   if (guideReviews.length > 0) {
    //     rating =
    //       guideReviews.reduce((acc, value) => acc + value.rating, 0) /
    //       guideReviews.length;
    //   }
    //
    //   return { ...guide.toObject(), rating };
    // });
    //
    // const guidesAll = await Promise.all(guidesWithRating);
    return res.send(guides);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

guidesRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const guide = await Guide.findById(id).populate({
      path: 'user',
      select: 'username , displayName',
    });

    if (!guide) {
      return res.status(404).send('Not found');
    }

    // let rating = 0;
    // const guideReviews = await TourReview.find({ guide: guide._id });
    //
    // if (guideReviews.length > 0) {
    //   rating =
    //     guideReviews.reduce((acc, value) => acc + value.rating, 0) /
    //     guideReviews.length;
    // }
    //
    // const guideWithRating = { ...guide.toObject(), rating };

    return res.send(guide);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

export default guidesRouter;
