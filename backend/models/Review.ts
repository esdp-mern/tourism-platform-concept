import mongoose from "mongoose";
import User from "./User";
import Tour from "./Tour";
import Guide from "./Guide";

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await User.findById(value),
      message: "User does not exist!",
    },
  },
  tour: {
    type: mongoose.Types.ObjectId,
    ref: "Tour",
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await Tour.findById(value),
      message: "Tour does not exist!",
    },
  },
  guide: {
    type: mongoose.Types.ObjectId,
    ref: "Guide",
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await Guide.findById(value),
      message: "Guide does not exist!",
    },
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: [Number],
    required: true,
  },
  date: {
    type: Date,
  },
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
