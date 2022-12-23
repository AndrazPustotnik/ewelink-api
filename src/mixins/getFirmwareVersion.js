import { _get } from '../helpers/utilities.js';
import errors from '../data/errors.js';


/**
 * Get device firmware version
 *
 * @param deviceId
 *
 * @returns {Promise<{fwVersion: *, status: string}|{msg: string, error: *}>}
 */
export async function getFirmwareVersion(deviceId) {
  const device = await this.getDevice(deviceId);
  const error = _get(device, 'error', false);
  const fwVersion = _get(device, 'params.fwVersion', false);

  if (error || !fwVersion) {
    return { error, msg: errors[error] };
  }

  return { status: 'ok', fwVersion };
}
