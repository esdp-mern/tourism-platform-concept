import express from 'express';
import User, { IUserMethods } from '../models/User';
import mongoose, { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';
import auth, { RequestWithUser } from '../middleware/auth';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import { imagesUpload } from '../multer';
import permit from '../middleware/permit';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.get('/', async (req, res, next) => {
  try {
    if (!req.query) {
      const users = await User.find();
      return res.send(users);
    }
    const users = await User.find({
      username: { $regex: req.query.username, $options: 'i' },
    });
    res.send(users);
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();

    const answer = {
      user,
      message: 'You registered new user!',
    };

    return res.send(answer);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ error: 'Wrong password or username!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Wrong password or username!' });
    }

    user.generateToken();
    await user.save();

    const answer = {
      user,
      message: 'You are authenticated!',
    };

    return res.send(answer);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

usersRouter.delete('/sessions', auth, async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;
    user.token = randomUUID();
    await user.save();
    res.send({ message: 'Logout successful, token has been refreshed' });
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google login error!' });
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const avatar = payload['picture'];

    if (!email) {
      return res
        .status(400)
        .send({ error: 'Not enough user data to continue' });
    }

    let user = (await User.findOne({
      googleID: id,
    })) as HydratedDocument<IUserMethods>;

    if (!user) {
      user = new User({
        username: email,
        email: email,
        password: randomUUID(),
        displayName,
        googleID: id,
        avatar,
      });
    }

    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with Google was successful!', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.put(
  '/:id',
  auth,
  imagesUpload.single('avatar'),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = (req as RequestWithUser).user;
      const existingUser = await User.findById(userId);

      if (!existingUser) {
        return res.status(404).send('User not found');
      }

      if (user._id.toString() !== existingUser._id.toString()) {
        return res.status(403).send({
          error: `No permissions to change user: ${user._id} exist: ${existingUser._id}`,
        });
      }

      existingUser.username = req.body.username
        ? req.body.username
        : existingUser.username;
      existingUser.email = req.body.email ? req.body.email : existingUser.email;
      existingUser.displayName = req.body.displayName
        ? req.body.displayName
        : existingUser.displayName;
      existingUser.avatar = req.file
        ? '/images/' + req.file.filename
        : existingUser.avatar;

      await existingUser.save();
      return res.send({ user: existingUser, message: 'Changes saved!' });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

usersRouter.put(
  '/:id/change-role',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = (req as RequestWithUser).user;
      const currentUser = await User.findById(userId);

      if (!currentUser) {
        return res.status(404).send('User not found');
      }

      currentUser.role = req.body.role || currentUser.role;

      await currentUser.save();

      return res.send({
        user: currentUser,
        message: 'User role updated successfully',
      });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

export default usersRouter;
