import mongoose, { HydratedDocument } from 'mongoose';
import User from './User';
import { IReview } from '../type';

const ReviewSchema = new mongoose.Schema<IReview>({
  user: {
    type: String,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await User.findById(value),
      message: 'User does not exist!',
    },
  },
  tour: {
    type: mongoose.Types.ObjectId,
    ref: 'Tour',
    validate: {
      validator: function (
        this: HydratedDocument<IReview>,
        tour: mongoose.Types.ObjectId,
      ) {
        return !!(this.guide || tour);
      },
      message: 'Tour or guide is required',
    },
  },
  guide: {
    type: mongoose.Types.ObjectId,
    ref: 'Guide',
    validate: {
      validator: function (
        this: HydratedDocument<IReview>,
        guide: mongoose.Types.ObjectId,
      ) {
        return !!(this.tour || guide);
      },
      message: 'Tour or guide is required',
    },
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
