import { _get, timestamp } from '../helpers/utilities.js';
import errors from '../data/errors.js';

/**
 * Get all devices information
 *
 * @returns {Promise<{msg: string, error: number}|*>}
 */
export async function getDevices() {
  const { APP_ID } = this;

  const response = await this.makeRequest({
    uri: '/user/device',
    qs: {
      lang: 'en',
      appid: APP_ID,
      ts: timestamp,
      version: 8,
      getTags: 1,
    },
  });

  const error = _get(response, 'error', false);
  const devicelist = _get(response, 'devicelist', false);

  if (error) {
    return { error, msg: errors[error] };
  }

  if (!devicelist) {
    return { error: 404, msg: errors.noDevices };
  }

  return devicelist;
}