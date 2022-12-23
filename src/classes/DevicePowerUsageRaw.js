import WebSocket from './WebSocket.js';
import wssLoginPayload from '../payloads/wssLoginPayload.js';
import wssUpdatePayload from '../payloads/wssUpdatePayload.js';
import { _get } from '../helpers/utilities.js';
import errors from '../data/errors.js';

class DevicePowerUsageRaw extends WebSocket {
  /**
   * Get specific device power usage (raw data)
   *
   * @param apiUrl
   * @param at
   * @param apiKey
   * @param deviceId
   * @returns {Promise<{error: string}|{data: {hundredDaysKwhData: *}, status: string}|{msg: any, error: *}|{msg: string, error: number}>}
   */
  static async get({ apiUrl, at, apiKey, deviceId }) {
    const payloadLogin = wssLoginPayload({ at, apiKey, appid: this.APP_ID });

    const payloadUpdate = wssUpdatePayload({
      apiKey,
      deviceId,
      params: { hundredDaysKwh: 'get' },
    });

    const response = await this.WebSocketRequest(apiUrl, [
      payloadLogin,
      payloadUpdate,
    ]);

    if (response.length === 1) {
      return { error: errors.noPower };
    }

    const error = _get(response[1], 'error', false);

    if (error === 403) {
      return { error, msg: response[1].reason };
    }

    const hundredDaysKwhData = _get(
      response[1],
      'config.hundredDaysKwhData',
      false
    );

    if (!hundredDaysKwhData) {
      return { error: errors.noPower };
    }

    return {
      status: 'ok',
      data: { hundredDaysKwhData },
    };
  }
}

export default DevicePowerUsageRaw;
