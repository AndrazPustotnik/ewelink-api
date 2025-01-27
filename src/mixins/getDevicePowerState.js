import { _get } from '../helpers/utilities.js';
import errors from '../data/errors.js';
import deviceStatusPayload from '../payloads/deviceStatus.js';


/**
 * Get current power state for a specific device
 *
 * @param deviceId
 * @param channel
 *
 * @returns {Promise<{state: *, status: string}|{msg: string, error: *}>}
 */
export async function getDevicePowerState(deviceId, channel = 1) {
  const status = await this.makeRequest({
    uri: '/user/device/status',
    qs: deviceStatusPayload({
      appid: this.APP_ID,
      deviceId,
      params: 'switch|switches',
    }),
  });

  const error = _get(status, 'error', false);

  if (error) {
    const err = error === 400 ? 404 : error;
    return { error: err, msg: errors[err] };
  }

  let state = _get(status, 'params.switch', false);
  const switches = _get(status, 'params.switches', false);

  const switchesAmount = switches ? switches.length : 1;

  if (switchesAmount > 0 && switchesAmount < channel) {
    return { error: 404, msg: errors.ch404 };
  }

  if (switches) {
    state = switches[channel - 1].switch;
  }

  return { status: 'ok', state, channel };
}
