import fs from 'fs';
import { _get } from '../helpers/utilities.js';


/**
 * Save devices cache file (useful for using zeroconf)
 * @returns {Promise<string|{msg: string, error: number}|*|Device[]|{msg: string, error: number}>}
 */
export async function saveDevicesCache(fileName = './devices-cache.json') {
  const devices = await this.getDevices();

  const error = _get(devices, 'error', false);

  if (error || !devices) {
    return devices;
  }

  const jsonContent = JSON.stringify(devices, null, 2);

  try {
    fs.writeFileSync(fileName, jsonContent, 'utf8');
    return { status: 'ok', file: fileName };
  } catch (e) {
    console.log('An error occured while writing JSON Object to File.');
    return { error: e.toString() };
  }
}
