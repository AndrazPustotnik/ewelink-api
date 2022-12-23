import { _get } from '../helpers/utilities.js';
import errors from '../data/errors.js';
import { getDeviceChannelCount as getDeviceChannelCountEWeLink } from '../helpers/ewelink.js';

/**
 * Get device channel count
 *
 * @param deviceId
 *
 * @returns {Promise<{switchesAmount: *, status: string}|{msg: string, error: *}>}
 */
export async function getDeviceChannelCount(deviceId) {
  const device = await this.getDevice(deviceId);
  const error = _get(device, 'error', false);
  const uiid = _get(device, 'extra.extra.uiid', false);
  const switchesAmount = getDeviceChannelCountEWeLink(uiid);

  if (error) {
    return { error, msg: errors[error] };
  }

  return { status: 'ok', switchesAmount };
}
