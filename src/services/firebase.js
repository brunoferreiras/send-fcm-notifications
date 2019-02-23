import { getNotification, getProjectUrlByProject, requestFirebase } from './utils';
import getAccessToken from './jwt';

const firebase = async (value) => {
  const access = await getAccessToken(value.project);
  const url = getProjectUrlByProject(access.projectId);
  const body = getNotification(value.title, value.message, value.token);

  const config = { headers: { Authorization: `Bearer ${access.jwt}` } };

  return requestFirebase(url, body, config);
};

export default firebase;
