import { checkDevicesUpdates } from './checkDevicesUpdates';
import { checkDeviceUpdate } from './checkDeviceUpdate';
import deviceControl from './deviceControl';
import { getCredentials } from './getCredentials';
import { getDevice } from './getDevice';
import { getDeviceChannelCount } from './getDeviceChannelCount';
import getDeviceCurrentTH from './getDeviceCurrentTH';
import { getDeviceIP } from './getDeviceIP';
import { getDevicePowerState } from './getDevicePowerState';
import { getDevicePowerUsage } from './getDevicePowerUsage';
import { getDevicePowerUsageRaw } from './getDevicePowerUsageRaw';
import { getDevices } from './getDevices';
import { getFirmwareVersion } from './getFirmwareVersion';
import { getRegion } from './getRegion';
import { makeRequest } from './makeRequest';
import { openWebSocket } from './openWebSocket';
import { saveDevicesCache } from './saveDevicesCache';
import { setDevicePowerState } from './setDevicePowerState';
import { toggleDevice } from './toggleDevice';

export const mixins = {
  checkDevicesUpdates,
  checkDeviceUpdate,
  ...deviceControl,
  getCredentials,
  getDevice,
  getDeviceChannelCount,
  ...getDeviceCurrentTH,
  getDeviceIP,
  getDevicePowerState,
  getDevicePowerUsage,
  getDevicePowerUsageRaw,
  getDevices,
  getFirmwareVersion,
  getRegion,
  makeRequest,
  openWebSocket,
  saveDevicesCache,
  setDevicePowerState,
  toggleDevice,
};

