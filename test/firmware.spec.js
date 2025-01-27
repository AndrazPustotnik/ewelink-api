import ewelink from '../main';
import errors from '../src/data/errors';

import {
  email,
  password,
  singleChannelDeviceId,
  outdatedFirmwareDevice,
  updatedFirmwareDevice,
} from './_setup/config/credentials.js';

import { firmwareExpectations } from './_setup/expectations';

describe('firmware: get version methods', () => {
  let connection;

  beforeAll(() => {
    connection = new ewelink({ email, password });
  });

  test('get firmware version', async () => {
    const device = await connection.getDevice(singleChannelDeviceId);
    const currentVersion = device.params.fwVersion;
    const firmware = await connection.getFirmwareVersion(singleChannelDeviceId);
    expect(typeof firmware).toBe('object');
    expect(firmware.status).toBe('ok');
    expect(firmware.fwVersion).toBe(currentVersion);
  });

  test('get device firmware version should be right message', async () => {
    const credentials = await connection.getCredentials();
    const accessToken = credentials.at;
    const conn = new ewelink({ at: accessToken });
    const device = await conn.getDevice(singleChannelDeviceId);
    const currentVersion = device.params.fwVersion;
    const firmware = await conn.getFirmwareVersion(singleChannelDeviceId);
    expect(typeof firmware).toBe('object');
    expect(firmware.status).toBe('ok');
    expect(firmware.fwVersion).toBe(currentVersion);
  });

  test('get invalid device firmware version should fail', async () => {
    const conn = new ewelink({ email, password });
    const firmwareVersion = await conn.getFirmwareVersion('invalid deviceid');
    expect(typeof firmwareVersion).toBe('object');
    expect(firmwareVersion.msg).toBe(errors['404']);
    expect(firmwareVersion.error).toBe(404);
  });

  test('get device firmware version using invalid credentials should fail', async () => {
    const conn = new ewelink({ email: 'invalid', password: 'credentials' });
    const firmware = await conn.getFirmwareVersion(singleChannelDeviceId);
    expect(typeof firmware).toBe('object');
    expect(firmware.msg).toBe(errors['406']);
    expect(firmware.error).toBe(406);
  });
});

describe('firmware: check updates methods', () => {
  let connection;

  beforeAll(() => {
    connection = new ewelink({ email, password });
  });

  test('outdated device firmware should return available version', async () => {
    const status = await connection.checkDeviceUpdate(outdatedFirmwareDevice);
    expect(typeof status).toBe('object');
    expect(typeof status).toBe('object');
    expect(status.status).toBe('ok');
    expect(status.msg).toBe('Update available');
    expect(typeof status.version).toBe('string');
  });

  test('updated device firmware should return right message', async () => {
    const status = await connection.checkDeviceUpdate(updatedFirmwareDevice);
    expect(typeof status).toBe('object');
    expect(typeof status).toBe('object');
    expect(status.status).toBe('ok');
    expect(status.msg).toBe('No update available');
  });

  test('invalid device update check should return error', async () => {
    const status = await connection.checkDeviceUpdate('invalid deviceid');
    expect(typeof status).toBe('object');
    expect(status.msg).toBe(errors['404']);
    expect(status.error).toBe(404);
  });

  test('get devices update check should be valid response', async () => {
    const status = await connection.checkDevicesUpdates();
    expect(typeof status).toBe('object');
    expect(status[0]).toMatchObject(firmwareExpectations);
  });

  test('get devices update check with invalid credentials should fail', async () => {
    const conn = new ewelink({ email: 'invalid', password: 'credentials' });
    const status = await conn.checkDevicesUpdates();
    expect(typeof status).toBe('object');
    expect(status.msg).toBe(errors['406']);
    expect(status.error).toBe(406);
  });
});
