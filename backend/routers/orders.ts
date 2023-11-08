import express from 'express';
import Order from '../models/Order';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';

const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
  const orders = await Order.find();
  return res.send(orders);
});

ordersRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const order = new Order({
      user: user._id,
      guide: req.body.guide,
      tour: req.body.tour,
      price: req.body.price,
      date: req.body.date,
    });

    await order.save();
    return res.send(order);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default ordersRouter;
