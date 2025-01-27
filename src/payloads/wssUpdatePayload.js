import { timestamp } from '../helpers/utilities.js';

const wssUpdatePayload = ({ apiKey, deviceId, params }) => {
  const payload = {
    action: 'update',
    apikey: apiKey,
    deviceid: deviceId,
    selfApikey: apiKey,
    params,
    ts: timestamp,
    userAgent: 'app',
    sequence: Math.floor(timestamp * 1000),
  };
  return JSON.stringify(payload);
};

export default wssUpdatePayload;
