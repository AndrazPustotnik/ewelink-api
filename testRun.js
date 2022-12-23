import ewelink from './main.js';

const deviceId = '<deviceId>';
const email = "<email>";
const password = "<password>";

(async () => {

  const connection = new ewelink({
    email: email,
    password: password,
  });

  /* get all devices */
  const devices = await connection.getDevices();
  console.log("devices", devices.map((d) => {
    return {name: d.name, id: d.deviceid, ...d.params}
  }));

  const params = {
    switch: 'on',
    colorR: 255,
    colorG: 255,
    colorB: 255,
    bright: 1,
    mode: 1,
  }
  const status = await connection.setDeviceParams(deviceId, params);
  console.log("status", status);

  /* get specific devide info */
  const device = await connection.getDevice(deviceId);
  console.log("device", device);

  /* toggle device */
  //await connection.toggleDevice(deviceId);

})();