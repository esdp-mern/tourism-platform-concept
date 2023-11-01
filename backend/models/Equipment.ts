import mongoose from 'mongoose';
import { IEquipment } from '../type';

const EquipmentSchema = new mongoose.Schema<IEquipment>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Equipment = mongoose.model('Equipment', EquipmentSchema);
export default Equipment;
