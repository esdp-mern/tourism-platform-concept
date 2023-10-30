import mongoose from "mongoose";
import Guid from "./Guid";

const TourSchema = new mongoose.Schema({
  guid: {
    type: mongoose.Types.ObjectId,
    ref: "Guid",
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await Guid.findById(value),
      message: "Guid does not exist!",
    },
  },
  category: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Tour = mongoose.model("Tour", TourSchema);
export default Tour;
