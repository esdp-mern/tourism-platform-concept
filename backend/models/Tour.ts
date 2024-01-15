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
    kg: String,
    ru: String,
    en: String,
  },
  mainImage: {
    type: String,
    required: true,
  },
  description: {
    kg: String,
    ru: String,
    en: String,
  },
  category: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: null,
  },
  duration: {
    type: Number,
    required: true,
  },
  plan: {
    type: [
      {
        title: {
          kg: String,
          ru: String,
          en: String,
        },
        planDescription: {
          kg: String,
          ru: String,
          en: String,
        },
      },
    ],
    required: true,
  },
  destination: {
    en: String,
    ru: String,
    kg: String,
  },
  arrival: {
    en: String,
    ru: String,
    kg: String,
  },
  departure: {
    en: String,
    ru: String,
    kg: String,
  },
  dressCode: {
    en: String,
    ru: String,
    kg: String,
  },
  included: {
    en: [String],
    ru: [String],
    kg: [String],
  },
  galleryTour: {
    type: [String],
    required: true,
  },
  country: {
    en: String,
    ru: String,
    kg: String,
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
