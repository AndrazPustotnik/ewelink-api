import ewelink from '../main';
import { email, password, deviceIdWithPower } from './_setup/config/credentials.js';
import { rawPowerUsageExpectations, currentMonthPowerUsageExpectations } from './_setup/expectations';

describe('power usage: node script', () => {
  let conn;

  beforeAll(async () => {
    conn = new ewelink({ email, password });
    await conn.getCredentials();
  });

  test('should return raw power usage', async () => {
    jest.setTimeout(30000);
    const powerUsage = await conn.getDevicePowerUsageRaw(deviceIdWithPower);
    expect(typeof powerUsage).toBe('object');
    expect(powerUsage).toMatchObject(rawPowerUsageExpectations);
    expect(powerUsage.data.hundredDaysKwhData.length).toBe(600);
  });

  test('should return current month power usage', async () => {
    jest.setTimeout(30000);
    const days = new Date().getDate();
    const powerUsage = await conn.getDevicePowerUsage(deviceIdWithPower);
    expect(typeof powerUsage).toBe('object');
    expect(powerUsage).toMatchObject(currentMonthPowerUsageExpectations);
    expect(powerUsage.daily.length).toBe(days);
  });
});

describe('power usage: serverless', () => {
  let accessToken;
  let apiKey;

  beforeAll(async () => {
    const conn = new ewelink({ email, password });
    const credentials = await conn.getCredentials();
    accessToken = credentials.at;
    apiKey = credentials.user.apikey;
  });

  test('should return raw power usage', async () => {
    jest.setTimeout(30000);
    const conn = new ewelink({ at: accessToken, apiKey });
    const powerUsage = await conn.getDevicePowerUsageRaw(deviceIdWithPower);
    expect(typeof powerUsage).toBe('object');
    expect(powerUsage).toMatchObject(rawPowerUsageExpectations);
    expect(powerUsage.data.hundredDaysKwhData.length).toBe(600);
  });

  test('should return current month power usage', async () => {
    jest.setTimeout(30000);
    const days = new Date().getDate();
    const conn = new ewelink({ at: accessToken, apiKey });
    const powerUsage = await conn.getDevicePowerUsage(deviceIdWithPower);
    expect(typeof powerUsage).toBe('object');
    expect(powerUsage).toMatchObject(currentMonthPowerUsageExpectations);
    expect(powerUsage.daily.length).toBe(days);
  });
});
