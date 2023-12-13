import express from 'express';
import Guide from '../models/Guide';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

const guidesRouter = express.Router();
guidesRouter.get('/', async (_, res) => {
  try {
    const guides = await Guide.find({ isPublished: true }).populate({
      path: 'user',
      select: 'username displayName avatar',
    });

    return res.send(guides);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
guidesRouter.get('/all', auth, permit('admin'), async (_, res) => {
  try {
    const guides = await Guide.find().populate({
      path: 'user',
      select: 'username, displayName, avatar',
    });

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
      select: 'username , displayName , avatar',
    });

    if (!guide) {
      return res.status(404).send('Not found');
    }

    return res.send(guide);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

guidesRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const guide = new Guide({
        user: req.body.user,
        languages: req.body.languages ? req.body.languages : [],
        country: req.body.country,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
      });

      await guide.save();
      return res.send(guide);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

guidesRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const guide = await Guide.findById(req.params.id);

      if (!guide) {
        return res.status(404).send('Not found');
      }

      const image =
        req.files && 'image' in req.files
          ? 'images/' + req.files['image'][0].filename
          : guide.image;

      guide.languages = req.body.languages
        ? req.body.languages
        : guide.languages;
      guide.country = req.body.country || guide.country;
      guide.description = req.body.description || guide.description;
      guide.image = image;

      await guide.save();
      return res.send(guide);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

guidesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const guide = await Guide.findById(req.params.id);

    if (!guide) {
      return res.status(404).send('Not found');
    }
    await guide.deleteOne();
    return res.send('Guide is deleted!');
  } catch (e) {
    return next(e);
  }
});

guidesRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const guide = await Guide.findById(id);

      if (!guide) {
        return res.status(404).send('Not Found!');
      }

      await Guide.findByIdAndUpdate(id, { isPublished: !guide.isPublished });

      res.send('Guide is changed');
    } catch (e) {
      res.status(500).send(e);
    }
  },
);

export default guidesRouter;
