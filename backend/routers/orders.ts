import express from 'express';
import Order from '../models/Order';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'guide',
        populate: { path: 'user', model: 'User', select: 'displayName email' },
      })
      .populate({ path: 'tour', select: 'name' })
      .populate({ path: 'user', select: 'displayName email' });
    if (req.query.datetime && req.query.datetime.length) {
      const datetime = req.query.datetime as string;

      const filteredData = orders.filter((item) => item.datetime > datetime);
      return res.send(filteredData);
    }
    return res.send(orders);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

ordersRouter.post('/', async (req, res, next) => {
  try {
    const order = new Order({
      guide: req.body.guide,
      tour: req.body.tour,
      price: req.body.price,
      date: req.body.date,
      user: req.body.user || null,
      email: req.body.email || null,
      phone: req.body.phone || null,
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

ordersRouter.delete(
  '/:id',
  auth,
  permit('moderator'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).send('Order not found');
      }

      await order.deleteOne();

      return res.send('Order deleted successfully');
    } catch (e) {
      return next(e);
    }
  },
);

ordersRouter.patch(
  '/changeStatus',
  auth,
  permit('moderator'),
  async (req, res, next) => {
    try {
      const order = await Order.findById(req.query.orderId);

      if (!order) {
        return res.status(404).send('Order not found');
      }

      order.status = req.body;
      await order.save();
      return res.send(order);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

export default ordersRouter;
