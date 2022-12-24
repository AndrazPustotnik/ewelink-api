# ewelink-api (4npy)
> eWeLink API (4npy version) for ES6


## Key features
* can run on browsers, node scripts or serverless environment
* set on/off devices
* get power consumption on devices like Sonoff POW
* listen for devices events
* using zeroconf (LAN mode), no internet connection required

## 4npy changed:
* CJS to ES6
* setDeviceParams(deviceId, { params })
* This is version for electron. For pure ES6 testing, uncomment `assert { type: "json" };` from `helpers/ewelink.js`


## Installation
```sh
 npm install AndrazPustotnik/ewelink-api
```


## Usage
Check library documentation and examples at https://github.com/skydiver/ewelink-api/tree/master/docs