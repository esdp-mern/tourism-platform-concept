import mongoose from 'mongoose';

const GuideOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'new',
    enum: ['new', 'being considered', 'approved'],
  },
});

const GuideOrder = mongoose.model('GuideOrder', GuideOrderSchema);
export default GuideOrder;
