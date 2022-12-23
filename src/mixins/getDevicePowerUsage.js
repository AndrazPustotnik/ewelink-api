import { _get } from '../helpers/utilities.js';
import parsePowerUsage from '../parsers/parsePowerUsage.js';


/**
 * Get device power usage for current month
 *
 * @param deviceId
 *
 * @returns {Promise<{error: string}|{daily: *, monthly: *}>}
 */
export async function getDevicePowerUsage(deviceId) {
  const response = await this.getDevicePowerUsageRaw(deviceId);

  const error = _get(response, 'error', false);
  const hundredDaysKwhData = _get(response, 'data.hundredDaysKwhData', false);

  if (error) {
    return response;
  }

  return {
    status: 'ok',
    ...parsePowerUsage({ hundredDaysKwhData }),
  };
}
