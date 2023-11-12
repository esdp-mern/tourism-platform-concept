import express from 'express';
import User, {IUserMethods} from '../models/User';
import mongoose, {HydratedDocument} from 'mongoose';
import {randomUUID} from 'crypto';
import auth, {RequestWithUser} from '../middleware/auth';
import {OAuth2Client} from 'google-auth-library';
import config from '../config';
import {imagesUpload} from '../multer';
import write_https_image from '../features/write_https_image';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

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

    const avatarFileName = `images/${randomUUID()}.png`;

    const avatarPath = `${config.publicPath}/${avatarFileName}`;

    let user = (await User.findOne({
      googleID: id,
    })) as HydratedDocument<IUserMethods>;

    if (!user && avatar) {
      write_https_image(avatar, avatarPath, async () => {
        user = new User({
          username: email,
          email: email,
          password: randomUUID(),
          displayName,
          googleID: id,
          avatar: avatarFileName,
        });

        user.generateToken();
        await user.save();
        return res.send({ message: 'Login with Google was successful!', user });
      });
    } else {
      user.generateToken();
      await user.save();
      return res.send({ message: 'Login with Google was successful!', user });
    }
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
