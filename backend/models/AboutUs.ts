import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
});

const AboutUsSchema = new mongoose.Schema({
  main: BlockSchema,
  offer: BlockSchema,
  posts: [BlockSchema],
  review: BlockSchema,
});

const AboutUs = mongoose.model('AboutUs', AboutUsSchema);

export default AboutUs;
