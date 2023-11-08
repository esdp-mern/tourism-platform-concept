import mongoose from 'mongoose';
import User from './User';

const GuideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await User.findById(value),
      message: 'User does not exist!',
    },
  },
  description: {
    type: String,
    required: true,
  },
  languages: {
    type: Array,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Guide = mongoose.model('Guide', GuideSchema);
export default Guide;
