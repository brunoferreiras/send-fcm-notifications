import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.status(200).send({
    title: 'Mobile Notifications API',
    version: '1.0.0',
  });
});

export default indexRouter;
