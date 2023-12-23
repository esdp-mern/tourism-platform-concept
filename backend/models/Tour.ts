import mongoose from 'mongoose';

const TourSchema = new mongoose.Schema({
  guides: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Guide',
      required: true,
    },
  ],
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
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  rating: {
    type: Number,
    default: 5,
  },
  routes: [],
});

const Tour = mongoose.model('Tour', TourSchema);
export default Tour;
