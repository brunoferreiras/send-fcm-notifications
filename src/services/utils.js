import fs from 'fs';
import axios from 'axios';

const getProjectUrlByProject = project => `https://fcm.googleapis.com/v1/projects/${project}/messages:send`;

const getInfoByProject = project => JSON.parse(fs.readFileSync(`./src/services/projects/${project}.json`, 'utf8'));

const getNotification = (title, message, token) => JSON.parse(`{
"message": {
    "token" : "${token}",
    "notification" : {
      "body" : "${message}",
      "title" : "${title}"
    },
    "android": {
      "notification": {
        "sound": "default",
        "icon": "ic_notif"
      }
    },
    "apns": {
      "payload": {
        "aps": {
          "sound": "default"
        }
      }
    }
   }
}`);

const requestFirebase = (url, body, config) => axios
  .post(url, body, config)
  .then(() => ({ success: true, message: 'Notification sent!' }))
  .catch(error => ({ success: false, message: error.message }));

export {
  getProjectUrlByProject, getInfoByProject, getNotification, requestFirebase,
};
