import express from 'express';
import Tour from '../models/Tour';
import User from '../models/User';
import Guide from '../models/Guide';
import Order from '../models/Order';
import News from '../models/News';
import Employee from '../models/Employee';
import Partner from '../models/Partner';

const statisticsRouter = express.Router();

statisticsRouter.get('/', async (req, res) => {
  try {
    const [
      toursPublished,
      toursUnpublished,
      toursAll,
      users,
      usersModerators,
      guidesAll,
      guidesPublished,
      guidesUnpublished,
      newsAll,
      newsPublished,
      newsUnpublished,
      employeeAll,
      partnersAll,
      ordersAll,
      ordersBooked,
      ordersConsiders,
      ordersApproved,
    ] = await Promise.all([
      Tour.countDocuments({ isPublished: true }),
      Tour.countDocuments({ isPublished: false }),
      Tour.countDocuments(),
      User.countDocuments(),
      User.countDocuments({ role: 'moderator' }),
      Guide.countDocuments(),
      Guide.countDocuments({ isPublished: true }),
      Guide.countDocuments({ isPublished: false }),
      News.countDocuments(),
      News.countDocuments({ isPublished: true }),
      News.countDocuments({ isPublished: false }),
      Employee.countDocuments(),
      Partner.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: 'booked' }),
      Order.countDocuments({ status: 'being considered' }),
      Order.countDocuments({ status: 'approved' }),
    ]);

    const newStats = {
      toursPublished,
      toursUnpublished,
      toursAll,
      users,
      usersModerators,
      guidesAll,
      guidesPublished,
      guidesUnpublished,
      newsAll,
      newsPublished,
      newsUnpublished,
      employeeAll,
      partnersAll,
      ordersAll,
      ordersBooked,
      ordersConsiders,
      ordersApproved,
    };

    return res.send(newStats);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
export default statisticsRouter;
