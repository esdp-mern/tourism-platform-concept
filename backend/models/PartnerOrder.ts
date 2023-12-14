import mongoose from 'mongoose';

const PartnerOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['approved', 'pending'],
  },
});

const Contacts = mongoose.model('PartnerOrder', PartnerOrderSchema);
export default Contacts;
