import express from 'express';
import Tour from '../models/Tour';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import Guide from '../models/Guide';
import { imagesUpload } from '../multer';
import { ILanguages } from '../type';

const toursRouter = express.Router();

toursRouter.get('/filterByName', async (req, res) => {
  try {
    const queries = {
      skip: parseInt(String(req.query.skip || 0)),
      limit: parseInt(String(req.query.limit || 0)),
    };

    if (req.query.name && req.query.skip && req.query.limit) {
      const tours = await Tour.find({
        name: { $regex: req.query.name, $options: 'i' },
      })
        .skip(queries.skip)
        .limit(queries.limit)
        .populate({
          path: 'guides',
          populate: {
            path: 'user',
            select: 'username displayName role avatar email',
          },
        });
      return res.send(tours);
    } else {
      return res
        .status(400)
        .send('query fields { name | skip | limit } are required');
    }
  } catch (e) {
    return res.status(500).send('Error');
  }
});

toursRouter.get('/filterByCategory', async (req, res) => {
  try {
    const queries = {
      skip: parseInt(String(req.query.skip || 0)),
      limit: parseInt(String(req.query.limit || 0)),
    };

    if (req.query.category && req.query.skip && req.query.limit) {
      const rawCategories = req.query.category as string;
      const categories = rawCategories.split(',') as string[];

      const tours = await Tour.find({ category: { $in: categories } })
        .skip(queries.skip)
        .limit(queries.limit)
        .populate({
          path: 'guides',
          populate: {
            path: 'user',
            select: 'username displayName role avatar email',
          },
        });

      return res.send(tours);
    } else {
      return res
        .status(400)
        .send('query fields { category | skip | limit } are required');
    }
  } catch (e) {
    return res.status(500).send('Error');
  }
});
toursRouter.get('/filterByMinPrice', async (req, res) => {
  try {
    const queries = {
      skip: parseInt(String(req.query.skip || 0)),
      limit: parseInt(String(req.query.limit || 0)),
    };

    if (req.query.skip && req.query.limit) {
      const tours = await Tour.find()
        .skip(queries.skip)
        .limit(queries.limit)
        .populate({
          path: 'guides',
          populate: {
            path: 'user',
            select: 'username displayName role avatar email',
          },
        })
        .sort({ price: 1 });
      return res.send(tours);
    } else {
      return res.status(400).send('query fields { skip | limit } are required');
    }
  } catch (e) {
    return res.status(500).send('Error');
  }
});
toursRouter.get('/filterByMaxPrice', async (req, res) => {
  try {
    const queries = {
      skip: parseInt(String(req.query.skip || 0)),
      limit: parseInt(String(req.query.limit || 0)),
    };

    if (req.query.skip && req.query.limit) {
      const tours = await Tour.find()
        .skip(queries.skip)
        .limit(queries.limit)
        .sort({ price: -1 })
        .populate({
          path: 'guides',
          populate: {
            path: 'user',
            select: 'username displayName role avatar email',
          },
        });
      return res.send(tours);
    } else {
      return res.status(400).send('query fields { skip | limit } are required');
    }
  } catch (e) {
    return res.status(500).send('Error');
  }
});
toursRouter.get('/', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    const queries = {
      guide: req.query.guide,
      skip: parseInt(String(req.query.skip || 0)),
      limit: parseInt(String(req.query.limit || 0)),
    };

    if (queries.guide) {
      const tours = await Tour.find({
        guides: queries.guide,
        isPublished: true,
      }).populate({
        path: 'guides',
        populate: {
          path: 'user',
          select: 'username displayName role avatar email',
        },
      });

      const updatedTours = tours.map((tour) => {
        return {
          ...tour.toObject(),
          name: tour.toObject().name?.[lang] || tour.toObject().name?.en,
          destination:
            tour.toObject().destination?.[lang] ||
            tour.toObject().destination?.en,
          country:
            tour.toObject().country?.[lang] || tour.toObject().country?.en,
        };
      });
      return res.send(updatedTours);
    }

    if (req.query.skip && req.query.limit) {
      const tours = await Tour.find({ isPublished: true })
        .skip(queries.skip)
        .limit(queries.limit)
        .populate({
          path: 'guides',
          populate: {
            path: 'user',
            select: 'username displayName role avatar email',
          },
        });

      const allToursLength = await Tour.countDocuments({
        isPublished: true,
      });

      const updatedTours = tours.map((tour) => {
        return {
          ...tour.toObject(),
          name: tour.toObject().name?.[lang] || tour.toObject().name?.en,
          destination:
            tour.toObject().destination?.[lang] ||
            tour.toObject().destination?.en,
          country:
            tour.toObject().country?.[lang] || tour.toObject().country?.en,
        };
      });
      return res.send({ tours: updatedTours, allToursLength });
    } else {
      return res.status(400).send('query fields { skip | limit } are required');
    }
  } catch (e) {
    return res.status(500).send('Error');
  }
});

toursRouter.get('/all', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    const queries = {
      skip: parseInt(String(req.query.skip || 0)),
      limit: parseInt(String(req.query.limit || 0)),
    };

    if (req.query.skip && req.query.limit) {
      if (req.query.all) {
        const tours = await Tour.find()
          .skip(queries.skip)
          .limit(queries.limit)
          .populate({
            path: 'guides',
            populate: {
              path: 'user',
              select: 'username displayName role avatar email',
            },
          });

        const allToursLength = await Tour.countDocuments();

        const updatedTours = tours.map((tour) => {
          return {
            ...tour.toObject(),
            name: tour.toObject().name?.[lang] || tour.toObject().name?.en,
            destination:
              tour.toObject().destination?.[lang] ||
              tour.toObject().destination?.en,
            country:
              tour.toObject().country?.[lang] || tour.toObject().country?.en,
          };
        });
        return res.send({ updatedTours, allToursLength });
      }

      const tours = await Tour.find({ isPublished: false })
        .skip(queries.skip)
        .limit(queries.limit)
        .populate({
          path: 'guides',
          populate: {
            path: 'user',
            select: 'username displayName role avatar email',
          },
        });

      const allToursLength = await Tour.countDocuments({
        isPublished: true,
      });

      const updatedTours = tours.map((tour) => {
        return {
          ...tour.toObject(),
          name: tour.toObject().name?.[lang] || tour.toObject().name?.en,
          destination:
            tour.toObject().destination?.[lang] ||
            tour.toObject().destination?.en,
          country:
            tour.toObject().country?.[lang] || tour.toObject().country?.en,
        };
      });
      return res.send({ updatedTours, allToursLength });
    } else {
      return res.status(400).send('query fields { skip | limit } are required');
    }
  } catch (e) {
    return res.status(500).send('Error');
  }
});

toursRouter.get('/:id', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
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

    const plan = tour.plan.map((planPoint) => {
      if (planPoint.title && planPoint.planDescription) {
        return {
          title: planPoint.title[lang],
          planDescription: planPoint.planDescription[lang],
        };
      }
    });

    const tourReviews = {
      _id: tour._id,
      guides: tour.guides,
      name: tour.name ? tour.name[lang] : tour.name,
      mainImage: tour.mainImage,
      description: tour.description ? tour.description[lang] : tour.description,
      category: tour.category,
      price: tour.price,
      duration: tour.duration,
      plan,
      destination: tour.destination ? tour.destination[lang] : tour.destination,
      arrival: tour.arrival ? tour.arrival[lang] : tour.arrival,
      departure: tour.departure ? tour.departure[lang] : tour.departure,
      dressCode: tour.dressCode ? tour.dressCode[lang] : tour.dressCode,
      included: tour.included ? tour.included[lang] : tour.included,
      country: tour.country ? tour.country[lang] : tour.country,
      galleryTour: tour.galleryTour,
      isPublished: tour.isPublished,
      routes: tour.routes,
      rating: tour.rating,
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
      const lang = req.get('lang') as 'en' | 'ru' | 'kg';
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

      const parsedPlan = JSON.parse(req.body.plan);
      const plan = parsedPlan.map(
        (planPoint: { title: ILanguages; planDescription: ILanguages }) => {
          return {
            title: {
              ...{ en: '', ru: '', kg: '' },
              [lang]: planPoint.title,
            },
            planDescription: {
              ...{ en: '', ru: '', kg: '' },
              [lang]: planPoint.planDescription,
            },
          };
        },
      );

      const tour = new Tour({
        guides: existGuide,
        name: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.name,
        },
        mainImage: mainImage,
        description: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.description,
        },
        category: JSON.parse(req.body.category),
        price: parseFloat(req.body.price),
        duration: parseFloat(req.body.duration),
        plan,
        destination: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.destination,
        },
        arrival: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.arrival,
        },
        departure: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.departure,
        },
        dressCode: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.dressCode,
        },
        included: {
          en: [],
          ru: [],
          kg: [],
          [lang]: JSON.parse(req.body.included),
        },
        galleryTour: gallery,
        country: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.country,
        },
        routes: JSON.parse(req.body.routes),
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
        const lang = req.get('lang') as 'en' | 'ru' | 'kg';
        const tourId = req.params.id;
        const existingTour = await Tour.findById(tourId);

        if (!existingTour) {
          return res.status(404).send('Tour not found');
        }

        let existGuide;

        if (req.body.guides) {
          const guides = JSON.parse(req.body.guides);

          existGuide = await Promise.all(
            guides.map(async (guideId: string) => {
              const guide = await Guide.findById(guideId);

              if (guide) {
                return guide._id;
              }
            }),
          );
        }

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

        const parsedPlan = JSON.parse(req.body.plan);
        const plan = parsedPlan.map(
          (
            planPoint: { title: ILanguages; planDescription: ILanguages },
            index: number,
          ) => {
            const defaultTitle = existingTour.plan[index]
              ? {
                  ...existingTour.plan[index].title,
                  [lang]: planPoint.title,
                }
              : { en: '', ru: '', kg: '' };
            const defaultDescription = existingTour.plan[index]
              ? {
                  ...existingTour.plan[index].planDescription,
                  [lang]: planPoint.planDescription,
                }
              : { en: '', ru: '', kg: '' };

            return {
              title: {
                ...defaultTitle,
                [lang]: planPoint.title,
              },
              planDescription: {
                ...defaultDescription,
                [lang]: planPoint.planDescription,
              },
            };
          },
        );

        existingTour.guides = existGuide || existingTour.guides;
        existingTour.name =
          { ...existingTour.name, [lang]: req.body.name } || existingTour.name;
        existingTour.mainImage = mainImage;
        if (existingTour.description) {
          existingTour.description[lang] =
            req.body.description || existingTour.description[lang];
        }
        existingTour.category = JSON.parse(req.body.category);
        existingTour.price = req.body.price || existingTour.price;
        existingTour.duration = req.body.duration || existingTour.duration;
        existingTour.plan = plan;
        existingTour.destination =
          { ...existingTour.destination, [lang]: req.body.destination } ||
          existingTour.destination;
        existingTour.arrival =
          { ...existingTour.arrival, [lang]: req.body.arrival } ||
          existingTour.arrival;
        existingTour.departure =
          { ...existingTour.departure, [lang]: req.body.departure } ||
          existingTour.departure;
        existingTour.dressCode =
          { ...existingTour.dressCode, [lang]: req.body.dressCode } ||
          existingTour.dressCode;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        existingTour.included =
          { ...existingTour.included, [lang]: JSON.parse(req.body.included) } ||
          existingTour.included;
        existingTour.galleryTour = gallery;
        existingTour.country =
          { ...existingTour.country, [lang]: req.body.country } ||
          existingTour.country;
        existingTour.routes = JSON.parse(req.body.routes);

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
