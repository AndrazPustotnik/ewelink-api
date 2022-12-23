import crypto from 'crypto';
import CryptoJS from 'crypto-js';
import random from 'random';
import DEVICE_TYPE_UUID from '../data/devices-type-uuid.json' assert { type: "json" };
import DEVICE_CHANNEL_LENGTH from '../data/devices-channel-length.json' assert { type: "json" };

export const makeAuthorizationSign = (APP_SECRET, body) =>
  crypto
    .createHmac('sha256', APP_SECRET)
    .update(JSON.stringify(body))
    .digest('base64');

const getDeviceTypeByUiid = uiid => DEVICE_TYPE_UUID[uiid] || '';

const getDeviceChannelCountByType = deviceType =>
  DEVICE_CHANNEL_LENGTH[deviceType] || 0;

export const getDeviceChannelCount = deviceUUID => {
  const deviceType = getDeviceTypeByUiid(deviceUUID);
  return getDeviceChannelCountByType(deviceType);
};

const create16Uiid = () => {
  let result = '';
  for (let i = 0; i < 16; i += 1) {
    result += random.int(0, 9);
  }
  return result;
};

const encryptionBase64 = t =>
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(t));

const decryptionBase64 = t =>
  CryptoJS.enc.Base64.parse(t).toString(CryptoJS.enc.Utf8);

export const encryptationData = (data, key) => {
  const encryptedMessage = {};
  const uid = create16Uiid();
  const iv = encryptionBase64(uid);
  const code = CryptoJS.AES.encrypt(data, CryptoJS.MD5(key), {
    iv: CryptoJS.enc.Utf8.parse(uid),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  encryptedMessage.uid = uid;
  encryptedMessage.iv = iv;
  encryptedMessage.data = code.ciphertext.toString(CryptoJS.enc.Base64);
  return encryptedMessage;
};

export const decryptionData = (data, key, iv) => {
  const iv64 = decryptionBase64(iv);
  const code = CryptoJS.AES.decrypt(data, CryptoJS.MD5(key), {
    iv: CryptoJS.enc.Utf8.parse(iv64),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return code.toString(CryptoJS.enc.Utf8);
};

export default {
  makeAuthorizationSign,
  getDeviceChannelCount,
  encryptationData,
  decryptionData,
};
