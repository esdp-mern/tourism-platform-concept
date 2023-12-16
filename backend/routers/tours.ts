import express from 'express';
import Tour from '../models/Tour';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import Guide from '../models/Guide';
import { imagesUpload } from '../multer';
import { ITourPoint } from '../type';

const toursRouter = express.Router();

toursRouter.get('/filterByName', async (req, res) => {
  try {
    if (req.query.name) {
      const tours = await Tour.find({
        name: { $regex: req.query.name, $options: 'i' },
      }).populate({
        path: 'guides',
        populate: {
          path: 'user',
          select: 'username displayName role avatar email',
        },
      });
      return res.send(tours);
    }
  } catch (e) {
    return res.status(500).send('Error');
  }
});

toursRouter.get('/filterByCategory', async (req, res) => {
  try {
    if (req.query.category) {
      const rawCategories = req.query.category as string;
      const categories = rawCategories.split(',') as string[];

      const tours = await Tour.find({ category: { $in: categories } }).populate(
        {
          path: 'guides',
          populate: {
            path: 'user',
            select: 'username displayName role avatar email',
          },
        },
      );

      return res.send(tours);
    }
  } catch (e) {
    return res.status(500).send('Error');
  }
});
toursRouter.get('/filterByMinPrice', async (_, res) => {
  try {
    const tours = await Tour.find()
      .populate({
        path: 'guides',
        populate: {
          path: 'user',
          select: 'username displayName role avatar email',
        },
      })
      .sort({ price: 1 });
    return res.send(tours);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
toursRouter.get('/filterByMaxPrice', async (_, res) => {
  try {
    const tours = await Tour.find()
      .sort({ price: -1 })
      .populate({
        path: 'guides',
        populate: {
          path: 'user',
          select: 'username displayName role avatar email',
        },
      });
    return res.send(tours);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
toursRouter.get('/', async (req, res) => {
  try {
    let tours;

    if (req.query.guide) {
      tours = await Tour.find({
        guides: req.query.guide,
        isPublished: true,
      }).populate({
        path: 'guides',
        populate: {
          path: 'user',
          select: 'username displayName role avatar email',
        },
      });
      return res.send(tours);
    }
    tours = await Tour.find({ isPublished: true }).populate({
      path: 'guides',
      populate: {
        path: 'user',
        select: 'username displayName role avatar email',
      },
    });
    return res.send(tours);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

toursRouter.get('/all', async (req, res) => {
  try {
    let tours;

    if (req.query.true) {
      tours = await Tour.find().populate({
        path: 'guides',
        populate: {
          path: 'user',
          select: 'username displayName role avatar email',
        },
      });
      return res.send(tours);
    }

    tours = await Tour.find({ isPublished: false }).populate({
      path: 'guides',
      populate: {
        path: 'user',
        select: 'username displayName role avatar email',
      },
    });
    return res.send(tours);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

toursRouter.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate({
      path: 'guides',
      populate: {
        path: 'user',
        select: 'username displayName role avatar email',
      },
    });

    if (!tour) {
      return res.status(404).send('Not found!');
    }

    const tourReviews = {
      _id: tour._id,
      guides: tour.guides,
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
      routes: tour.routes,
    };
    return res.send(tourReviews);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

toursRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'galleryTour', maxCount: 10 },
  ]),
  async (req, res, next) => {
    try {
      let existGuide;

      if (req.body.guides) {
        const guideInput = JSON.parse(req.body.guides);

        existGuide = Array.isArray(guideInput) ? guideInput : [guideInput];

        existGuide = await Promise.all(
          existGuide.map(async (guideId: string) => {
            const guides = await Guide.findById(guideId);

            if (guides) {
              return guides._id;
            } else {
              throw new Error(`Guide with ID ${guideId} not found.`);
            }
          }),
        );
      }

      const mainImage =
        req.files && 'mainImage' in req.files
          ? 'images/' +
            (req.files as { [fieldname: string]: Express.Multer.File[] })[
              'mainImage'
            ][0].filename
          : null;

      const gallery =
        req.files && 'galleryTour' in req.files
          ? (req.files as { [fieldname: string]: Express.Multer.File[] })[
              'galleryTour'
            ].map((file) => 'images/' + file.filename)
          : [];

      const routes = JSON.parse(req.body.routes).map((route: ITourPoint[]) => {
        return route.map((point) => {
          return {
            ...point,
            icon: `mapMarkers/${point.icon}-map-marker.svg`,
            lat: point.lat,
            lng: point.lng,
          };
        });
      });

      const tour = new Tour({
        guides: existGuide,
        name: req.body.name,
        mainImage: mainImage,
        description: req.body.description,
        category: JSON.parse(req.body.category),
        price: parseFloat(req.body.price),
        duration: parseFloat(req.body.duration),
        plan: JSON.parse(req.body.plan),
        destination: req.body.destination,
        arrival: req.body.arrival,
        departure: req.body.departure,
        dressCode: req.body.dressCode,
        included: JSON.parse(req.body.included),
        galleryTour: gallery,
        country: req.body.country,
        routes: routes,
      });

      await tour.save();
      return res.send(tour);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },

  toursRouter.put(
    '/:id',
    auth,
    permit('admin'),
    imagesUpload.fields([
      { name: 'mainImage', maxCount: 1 },
      { name: 'galleryTour', maxCount: 10 },
    ]),
    async (req, res, next) => {
      try {
        const tourId = req.params.id;

        const existingTour = await Tour.findById(tourId);

        if (!existingTour) {
          return res.status(404).send('Tour not found');
        }

        let existGuide;

        if (req.body.guide) {
          const guide = JSON.parse(req.body.guide);

          existGuide = await Promise.all(
            guide.map(async (guideId: string) => {
              const guides = await Guide.findById(guideId);

              if (guides) {
                return guides._id;
              }
            }),
          );
        }
        const plan =
          req.body.plan && Array.isArray(req.body.plan)
            ? req.body.plan.map(JSON.parse)
            : existingTour.plan;

        const category = req.body.category
          ? req.body.category
          : existingTour.category;
        const included = req.body.included
          ? req.body.included
          : existingTour.included;

        const mainImage =
          req.files && 'mainImage' in req.files
            ? 'images/' + req.files['mainImage'][0].filename
            : existingTour.mainImage;

        const gallery =
          req.files && 'galleryTour' in req.files
            ? req.files['galleryTour'].map(
                (file: Express.Multer.File) => 'images/' + file.filename,
              )
            : existingTour.galleryTour;

        existingTour.guides = existGuide || existingTour.guides;
        existingTour.name = req.body.name || existingTour.name;
        existingTour.mainImage = mainImage;
        existingTour.description =
          req.body.description || existingTour.description;
        existingTour.category = category;
        existingTour.price = req.body.price || existingTour.price;
        existingTour.duration = req.body.duration || existingTour.duration;
        existingTour.plan = plan;
        existingTour.destination =
          req.body.destination || existingTour.destination;
        existingTour.arrival = req.body.arrival || existingTour.arrival;
        existingTour.departure = req.body.departure || existingTour.departure;
        existingTour.dressCode = req.body.dressCode || existingTour.dressCode;
        existingTour.included = included;
        existingTour.galleryTour = gallery;
        existingTour.country = req.body.country || existingTour.country;
        existingTour.routes =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          JSON.parse([req.body.routes[0]]) || existingTour.routes;

        await existingTour.save();

        return res.send(existingTour);
      } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
          return res.status(400).send(e);
        }
        return next(e);
      }
    },
  ),
);

toursRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const tourId = req.params.id;

    const existingTour = await Tour.findById(tourId);

    if (!existingTour) {
      return res.status(404).send('Tour not found');
    }

    await existingTour.deleteOne();

    return res.send('Tour deleted successfully');
  } catch (e) {
    return next(e);
  }
});

toursRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const tour = await Tour.findById(id);

      if (!tour) {
        return res.status(404).send('Not Found!');
      }

      await Tour.findByIdAndUpdate(id, { isPublished: !tour.isPublished });

      res.send('Changed');
    } catch (e) {
      res.status(500).send(e);
    }
  },
);
export default toursRouter;
