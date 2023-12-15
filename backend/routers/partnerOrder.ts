import express from 'express';
import PartnerOrder from '../models/PartnerOrder';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';

const partnerOrderRouter = express.Router();

partnerOrderRouter.get('/', auth, permit('admin'), async (req, res) => {
  try {
    const requests = await PartnerOrder.find();
    return res.send(requests);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

partnerOrderRouter.post('/', async (req, res, next) => {
  try {
    const request = new PartnerOrder({
      name: req.body.name,
      surname: req.body.surname,
      message: req.body.message,
      number: req.body.number,
    });

    await request.save();
    return res.send(request);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});
partnerOrderRouter.patch(
  '/:id/toggle-status',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const requestId = req.params.id;
      const partnerOrder = await PartnerOrder.findById(requestId);

      if (!partnerOrder) {
        return res.status(404).send('Partner order not found');
      }

      partnerOrder.status =
        partnerOrder.status === 'approved' ? 'pending' : 'approved';

      await partnerOrder.save();
      return res.send(partnerOrder);
    } catch (e) {
      return next(e);
    }
  },
);
partnerOrderRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const requestId = req.params.id;
      const requests = await PartnerOrder.findById(requestId);

      if (!requests) {
        return res.status(404).send('Partner order not found');
      }
      await requests.deleteOne();
      return res.send('Partner order deleted!');
    } catch (e) {
      return next(e);
    }
  },
);

export default partnerOrderRouter;
