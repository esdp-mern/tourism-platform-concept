import mongoose from 'mongoose';

const ContactsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    type: [{ country: String, address: String, phone: String }],
    required: true,
  },
});

const Contacts = mongoose.model('Contacts', ContactsSchema);
export default Contacts;
