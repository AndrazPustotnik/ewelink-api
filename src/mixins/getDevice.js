import { nonce, timestamp, _get } from '../helpers/utilities';
import errors from '../data/errors';

export default {
  /**
   * Get information for a specific device
   *
   * @param deviceId
   * @returns {Promise<*|null|{msg: string, error: *}>}
   */
  async getDevice(deviceId) {
    if (this.devicesCache) {
      return this.devicesCache.find(dev => dev.deviceid === deviceId) || null;
    }

    const { APP_ID } = this;

    const device = await this.makeRequest({
      uri: `/user/device/${deviceId}`,
      qs: {
        deviceid: deviceId,
        appid: APP_ID,
        nonce,
        ts: timestamp,
        version: 8,
      },
    });

    const error = _get(device, 'error', false);

    if (error) {
      return { error, msg: errors[error] };
    }

    return device;
  },
};
