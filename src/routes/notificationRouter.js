import express from 'express';
import { send, sendTest } from '../controllers/notificationController';

const notificationRouter = express.Router();

notificationRouter.post('/send', send);
notificationRouter.get('/sendTest', sendTest);

export default notificationRouter;
