import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Contacts from '../models/ContactUs';

const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res) => {
  try {
    const contacts = await Contacts.findOne();
    return res.send(contacts);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
contactsRouter.put('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const existingContact = await Contacts.findOne();

    if (!existingContact) {
      return res.status(404).send('Contact not found');
    }

    existingContact.title = req.body.title || existingContact.title;
    existingContact.description =
      req.body.description || existingContact.description;
    existingContact.contact = req.body.contact || existingContact.contact;

    await existingContact.save();
    return res.json(existingContact);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e.message);
    }
    return next(e);
  }
});

export default contactsRouter;
