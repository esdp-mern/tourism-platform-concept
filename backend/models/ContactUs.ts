import mongoose from 'mongoose';

const ContactsSchema = new mongoose.Schema({
  title: {
    en: String,
    ru: String,
    kg: String,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    en: String,
    ru: String,
    kg: String,
  },
  country: {
    en: String,
    ru: String,
    kg: String,
  },
  address: {
    en: String,
    ru: String,
    kg: String,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Contacts = mongoose.model('Contacts', ContactsSchema);
export default Contacts;
