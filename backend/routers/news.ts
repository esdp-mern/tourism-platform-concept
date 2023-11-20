import express from 'express';
import News from '../models/News';

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
  try {
    const news = await News.find();
    return res.send(news);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

newsRouter.get('/:id', async (req, res) => {
  try {
    const oneNews = await News.findById(req.params.id);

    if (!oneNews) {
      return res.status(404).send('Not found!');
    }
    return res.send(oneNews);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

export default newsRouter;
