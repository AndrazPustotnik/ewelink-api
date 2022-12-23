import { encryptationData } from '../helpers/ewelink.js';
import { timestamp } from '../helpers/utilities.js';

const zeroConfUpdatePayload = (selfApikey, deviceId, deviceKey, params) => {
  const encryptedData = encryptationData(JSON.stringify(params), deviceKey);

  return {
    sequence: Math.floor(timestamp * 1000).toString(),
    deviceid: deviceId,
    selfApikey,
    iv: encryptedData.iv,
    encrypt: true,
    data: encryptedData.data,
  };
};

export default zeroConfUpdatePayload;
