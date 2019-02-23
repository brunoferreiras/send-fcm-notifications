import { google } from 'googleapis';
import { SCOPE_FIREBASE_MESSAGE } from './constants';
import { getInfoByProject } from './utils';

const getAccessToken = async project => new Promise((resolve, reject) => {
  const key = getInfoByProject(project);
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPE_FIREBASE_MESSAGE,
    null,
  );
  jwtClient.authorize((err, tokens) => {
    if (err) {
      reject(err);
      return;
    }
    resolve({
      projectId: key.project_id,
      jwt: tokens.access_token,
    });
  });
});

export default getAccessToken;
