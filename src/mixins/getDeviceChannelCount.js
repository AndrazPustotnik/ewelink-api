import { _get } from '../helpers/utilities';
import errors from '../data/errors';
import { getDeviceChannelCount } from '../helpers/ewelink';

export default {
  /**
   * Get device channel count
   *
   * @param deviceId
   *
   * @returns {Promise<{switchesAmount: *, status: string}|{msg: string, error: *}>}
   */
  async getDeviceChannelCount(deviceId) {
    const device = await this.getDevice(deviceId);
    const error = _get(device, 'error', false);
    const uiid = _get(device, 'extra.extra.uiid', false);
    const switchesAmount = getDeviceChannelCount(uiid);

    if (error) {
      return { error, msg: errors[error] };
    }

    return { status: 'ok', switchesAmount };
  },
};
