import mongoose from 'mongoose';

const MainSliderSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  toursAmount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const MainSlider = mongoose.model('MainSlider', MainSliderSchema);
export default MainSlider;
