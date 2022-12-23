import { timestamp, nonce } from '../helpers/utilities.js';

const credentialsPayload = ({ appid, email, phoneNumber, password }) => ({
  appid,
  email,
  phoneNumber,
  password,
  ts: timestamp,
  version: 8,
  nonce,
});

export default credentialsPayload;
