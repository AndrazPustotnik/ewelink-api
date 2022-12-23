import { checkDevicesUpdates } from './checkDevicesUpdates.js';
import { checkDeviceUpdate } from './checkDeviceUpdate.js';
import deviceControl from './deviceControl.js';
import { getCredentials } from './getCredentials.js';
import { getDevice } from './getDevice.js';
import { getDeviceChannelCount } from './getDeviceChannelCount.js';
import getDeviceCurrentTH from './getDeviceCurrentTH.js';
import { getDeviceIP } from './getDeviceIP.js';
import { getDevicePowerState } from './getDevicePowerState.js';
import { getDevicePowerUsage } from './getDevicePowerUsage.js';
import { getDevicePowerUsageRaw } from './getDevicePowerUsageRaw.js';
import { getDevices } from './getDevices.js';
import { getFirmwareVersion } from './getFirmwareVersion.js';
import { getRegion } from './getRegion.js';
import { makeRequest } from './makeRequest.js';
import { openWebSocket } from './openWebSocket.js';
import { saveDevicesCache } from './saveDevicesCache.js';
import { setDevicePowerState } from './setDevicePowerState.js';
import { toggleDevice } from './toggleDevice.js';
import { setDeviceParams } from './setDeviceParams.js';

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
  setDeviceParams,
};

