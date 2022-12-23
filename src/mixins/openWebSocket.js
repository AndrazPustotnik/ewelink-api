import pkg from 'websocket';
const { w3cwebsocket: W3CWebSocket } = pkg;
import WebSocketAsPromised from 'websocket-as-promised';
import wssLoginPayload from '../payloads/wssLoginPayload.js';


/**
 * Open a socket connection to eWeLink
 * and execute callback function with server message as argument
 *
 * @param callback
 * @param heartbeat
 * @returns {Promise<WebSocketAsPromised>}
 */
export async function openWebSocket(callback, ...{ heartbeat = 120000 }) {
  const payloadLogin = wssLoginPayload({
    at: this.at,
    apiKey: this.apiKey,
    appid: this.APP_ID,
  });

  const wsp = new WebSocketAsPromised(this.getApiWebSocket(), {
    createWebSocket: wss => new W3CWebSocket(wss),
  });

  wsp.onMessage.addListener(message => {
    try {
      const data = JSON.parse(message);
      callback(data);
    } catch (error) {
      callback(message);
    }
  });

  await wsp.open();
  await wsp.send(payloadLogin);

  setInterval(async () => {
    await wsp.send('ping');
  }, heartbeat);

  return wsp;
}
