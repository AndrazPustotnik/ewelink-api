import { _get } from '../helpers/utilities.js';
import parseFirmwareUpdates from '../parsers/parseFirmwareUpdates.js';

export async function checkDeviceUpdate(deviceId) {
  const device = await this.getDevice(deviceId);

  const error = _get(device, 'error', false);

  if (error) {
    return device;
  }

  const deviceInfoList = parseFirmwareUpdates([device]);

  const deviceInfoListError = _get(deviceInfoList, 'error', false);

  if (deviceInfoListError) {
    return deviceInfoList;
  }

  const update = await this.makeRequest({
    method: 'post',
    url: this.getOtaUrl(),
    uri: '/app',
    body: { deviceInfoList },
  });

  const isUpdate = _get(update, 'upgradeInfoList.0.version', false);

  if (!isUpdate) {
    return { status: 'ok', msg: 'No update available' };
  }

  return {
    status: 'ok',
    msg: 'Update available',
    version: isUpdate,
  };
}
