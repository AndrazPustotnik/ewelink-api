import { timestamp, nonce } from '../helpers/utilities.js';

const deviceStatus = ({ appid, deviceId, params }) => ({
  deviceid: deviceId,
  appid,
  nonce,
  ts: timestamp,
  version: 8,
  params,
});

export default deviceStatus;
