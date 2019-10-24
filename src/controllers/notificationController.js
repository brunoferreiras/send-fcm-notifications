import Joi from 'joi';
import firebase from '../services/firebase';
import notificationSchema from './notificationSchema';

const sendTest = async (req, res) => {
  const values = {
    project: 'szchat',
    title: 'FCM TEST',
    message: 'MESSAGE TEST',
    token:
      'f4a3LDw-kug:APA91bEt3FyAJ8Hr9DikmOqU0yZGCeixnFbherZYDbbuxhtOEKsUHGs1k8yQ59UAdn9eIj5YcI87j6jbrhFeGfFaFxfHbhBQK_bghPdFWcBeR6wE8zJtcgg2-W2SLKojWVqkCvLXgewK',
  };

  const response = await firebase(values);

  if (response.success) {
    res.status(200).json(response);
  }

  res.status(500).json(response);
};

const send = async (req, res) => {
  try {
    const { error, value } = Joi.validate(req.body, notificationSchema);
    if (error) {
      return res.status(400).json({ success: false, message: error.details });
    }

    const response = await firebase(value);

    if (response.success) {
      return res.status(200).json(response);
    }
    return res.status(500).json(response);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { sendTest, send };
