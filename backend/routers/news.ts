import express from 'express';
import News from '../models/News';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
  try {
    const news = await News.find();
    return res.send(news);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

newsRouter.get('/:id', async (req, res) => {
  try {
    const oneNews = await News.findById(req.params.id);

    if (!oneNews) {
      return res.status(404).send('Not found!');
    }
    return res.send(oneNews);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

newsRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.fields([
    {
      name: 'images',
      maxCount: 10,
    },
  ]),
  async (req, res, next) => {
    try {
      const images =
        req.files && 'images' in req.files
          ? (req.files as { [fieldname: string]: Express.Multer.File[] })[
              'galleryTour'
            ].map((file) => 'images/' + file.filename)
          : [];

      const category = req.body.category ? req.body.category : [];
      const news = new News({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        images,
        category,
      });

      await news.save();
      return res.send(news);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

newsRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.fields([
    {
      name: 'images',
      maxCount: 10,
    },
  ]),
  async (req, res, next) => {
    try {
      const newsId = req.params.id;
      const news = await News.findById(newsId);

      if (!news) {
        return res.status(404).send('News not found');
      }

      const category = req.body.category ? req.body.category : news.category;

      const images =
        req.files && 'images' in req.files
          ? req.files['galleryTour'].map(
              (file: Express.Multer.File) => 'images/' + file.filename,
            )
          : news.images;

      news.title = req.body.title || news.title;
      news.date = req.body.date || news.date;
      news.images = images;
      news.description = req.body.description || news.description;
      news.category = category;

      await news.save();

      return res.send(news);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

newsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).send('News not found');
    }
    await news.deleteOne();
    return res.send('News deleted!');
  } catch (e) {
    return next(e);
  }
});

export default newsRouter;
