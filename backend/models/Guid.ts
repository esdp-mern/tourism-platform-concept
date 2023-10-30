import mongoose from "mongoose";
import User from "./User";

const GuidSchema = new mongoose.Schema({
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
  languages: {
    type: Array,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  rating: {
    type: Array,
  },
});

const Guid = mongoose.model("Guid", GuidSchema);
export default Guid;
