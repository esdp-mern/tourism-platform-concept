import express from 'express';
import Order from '../models/Order';
import mongoose from 'mongoose';

const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
  try {
    if (req.query.datetime) {
      const datetime = new Date(String(req.query.datetime));
      const orders = await Order.find();

      const filteredData = orders.filter(
        (item) => new Date(item.datetime) > datetime,
      );
      return res.send(filteredData);
    }
    const orders = await Order.find();
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

export default ordersRouter;
