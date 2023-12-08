import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import usersRouter from './routers/users';
import toursRouter from './routers/tours';
import guidesRouter from './routers/guides';
import ordersRouter from './routers/orders';
import newsRouter from './routers/news';
import employeeRouter from './routers/employee';
import guideReviewRouter from './routers/guideReview';
import tourReviewRouter from './routers/tourReview';
import platformReviewRouter from './routers/platformReview';
import guideRatingRouter from './routers/guideRating';
import tourRatingRouter from './routers/tourRating';
import partnersRouter from './routers/partner';
import mainSliderRouter from './routers/mainSlider';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/tours', toursRouter);
app.use('/guides', guidesRouter);
app.use('/orders', ordersRouter);
app.use('/news', newsRouter);
app.use('/employees', employeeRouter);
app.use('/guideReviews', guideReviewRouter);
app.use('/platformReviews', platformReviewRouter);
app.use('/tourReviews', tourReviewRouter);
app.use('/guideRatings', guideRatingRouter);
app.use('/tourRatings', tourRatingRouter);
app.use('/partners', partnersRouter);
app.use('/mainSlider', mainSliderRouter);

app.get('*', (_, res) => res.sendStatus(404));

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => console.log(`Server started on ${port} port...`));

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.error(e));
