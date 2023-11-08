import express from 'express';
import Order from '../models/Order';

const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
  const orders = await Order.find();
  return res.send(orders);
});

export default ordersRouter;
