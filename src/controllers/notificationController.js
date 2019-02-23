import Joi from 'joi';
import firebase from '../services/firebase';
import notificationSchema from './notificationSchema';

const sendTest = async (req, res) => {
  const values = {
    project: 'project_name',
    title: 'FCM TEST',
    message: 'MESSAGE TEST',
    token:
      'dgDg8pxg2iY:APA91bEVE_nIu40GmVf_Do_0qDMAs9YoSBsscBKn-8QYGIVMaFLm6mfC3NThve55srvBCYaPAUGO3mnAJqU5wuLYisHEUIQS8AKxY0GZj8DNjogH5OCJPm8SbMYIpxd3UpU9vKGj_Lzo',
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
