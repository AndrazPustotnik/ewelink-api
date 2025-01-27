import fetch from 'node-fetch';
import WebSocket from './WebSocket.js';
import zeroConfUpdatePayload from '../payloads/zeroConfUpdatePayload.js';
import { _get } from '../helpers/utilities.js';

class ChangeStateZeroconf extends WebSocket {
  static async set({ url, device, params, switches, state }) {
    const selfApikey = device.apikey;
    const deviceId = device.deviceid;
    const deviceKey = device.devicekey;

    const endpoint = switches ? 'switches' : 'switch';

    const body = zeroConfUpdatePayload(selfApikey, deviceId, deviceKey, params);

    const request = await fetch(`${url}/${endpoint}`, {
      method: 'post',
      body: JSON.stringify(body),
    });

    const response = await request.json();

    const error = _get(response, 'error', false);

    if (error === 403) {
      return { error, msg: response.reason };
    }

    return { status: 'ok', state };
  }
}

export default ChangeStateZeroconf;
