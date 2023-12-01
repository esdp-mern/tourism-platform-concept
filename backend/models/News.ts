import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const News = mongoose.model('News', NewsSchema);
export default News;
