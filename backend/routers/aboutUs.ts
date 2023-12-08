import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import AboutUs from '../models/AboutUs';
import { IAboutUsBlock } from '../type';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const aboutUsRouter = express.Router();

aboutUsRouter.get('/', async (req, res) => {
  try {
    const [aboutUs] = await AboutUs.find();
    return res.send(aboutUs);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

aboutUsRouter.put(
  '/:sectionName',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const sectionName = req.params.sectionName as
        | 'main'
        | 'offer'
        | 'posts'
        | 'review';

      const queryPostId = req.query.postId;

      const [aboutUs] = await AboutUs.find();

      const section = aboutUs[sectionName] as HydratedDocument<
        IAboutUsBlock | IAboutUsBlock[]
      >;

      const sectionKeys = Object.keys(req.body) as Array<keyof IAboutUsBlock>;

      if (!section) {
        return res.status(404).send({ error: 'This section not found' });
      }

      if (!(section instanceof Array)) {
        sectionKeys.forEach((key) => {
          section[key] = req.body[key];
        });
      } else {
        const post = aboutUs.posts.find(
          (post) => post._id?.toString() === queryPostId,
        );

        if (!post) {
          return res.status(404).send({ error: 'This post not found!' });
        }

        sectionKeys.forEach((key) => {
          post[key] = req.body[key];
        });
      }

      await aboutUs.save();

      return res.send(aboutUs);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

aboutUsRouter.post('/posts', auth, permit('admin'), async (req, res, next) => {
  try {
    const [aboutUs] = await AboutUs.find();

    const newSection: IAboutUsBlock = {
      title: req.body.title,
      description: req.body.description || null,
      image: req.body.image || null,
    };

    aboutUs.posts.push(newSection);

    await aboutUs.save();

    return res.send(aboutUs);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

aboutUsRouter.delete(
  '/posts/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const [aboutUs] = await AboutUs.find();

      const post = aboutUs.posts.find(
        (post) => post._id?.toString() === req.params.id,
      );

      if (!post) {
        return res.status(404).send({ error: 'This post not found!' });
      }

      await post.deleteOne();

      await aboutUs.save();

      return res.send(aboutUs);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

export default aboutUsRouter;
