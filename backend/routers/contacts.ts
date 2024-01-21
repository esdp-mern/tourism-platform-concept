import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Contacts from '../models/ContactUs';
import { imagesUpload } from '../multer';

const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res) => {
  try {
    const contacts = await Contacts.find();
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';

    const localizedContacts = contacts.map((con) => {
      return {
        ...con.toObject(),
        title: con.toObject().title?.[lang] || con.toObject().title?.en,
        description:
          con.toObject().description?.[lang] || con.toObject().description?.en,
        country: con.toObject().title?.[lang] || con.toObject().country?.en,
        address: con.toObject().title?.[lang] || con.toObject().address?.en,
      };
    });

    return res.send(localizedContacts);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
contactsRouter.put('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const existingContact = await Contacts.findOne();
    const lang = req.get('lang') as 'en' | 'ru' | 'kg';

    if (!existingContact) {
      return res.status(404).send('Contact not found');
    }

    existingContact.title = {
      ...existingContact.title,
      [lang]: req.body.title,
    };
    existingContact.country = {
      ...existingContact.country,
      [lang]: req.body.country,
    };
    existingContact.description = {
      ...existingContact.description,
      [lang]: req.body.description,
    };
    existingContact.address = {
      ...existingContact.address,
      [lang]: req.body.address,
    };
    existingContact.phone = req.body.phone || existingContact.phone;

    await existingContact.save();
    return res.json(existingContact);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e.message);
    }
    return next(e);
  }
});

contactsRouter.patch(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const existingContact = await Contacts.findOne();

      if (!existingContact) {
        return res.status(404).send('Contact not found');
      }

      existingContact.image = req.file
        ? 'images/' + req.file.filename
        : existingContact.image;

      await existingContact.save();
      return res.json(existingContact);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e.message);
      }
      return next(e);
    }
  },
);

export default contactsRouter;
