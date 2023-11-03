import mongoose from 'mongoose';
import Guide from './Guide';

const TourSchema = new mongoose.Schema({
  guide: {
    type: mongoose.Types.ObjectId,
    ref: 'Guid',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await Guide.findById(value),
      message: 'Guide does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  plan: {
    type: [{ title: String, planDescription: String }],
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  dressCode: {
    type: String,
    required: true,
  },
  included: {
    type: [String],
    required: true,
  },
  galleryTour: {
    type: [String],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Tour = mongoose.model('Tour', TourSchema);
export default Tour;
