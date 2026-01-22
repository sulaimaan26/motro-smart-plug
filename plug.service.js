const TuyAPI = require('tuyapi');

const device = new TuyAPI({
  id: process.env.TUYA_DEVICE_ID,
  key: process.env.TUYA_LOCAL_KEY,
  ip: process.env.TUYA_DEVICE_IP,
  version: process.env.TUYA_VERSION || '3.3'
});

async function setPower(state) {
  try {
    await device.connect();
    await device.set({ dps: 1, set: state });
    await device.disconnect();
    return true;
  } catch (error) {
    await device.disconnect();
    throw error;
  }
}

async function getStatus() {
  await device.connect();
  const status = await device.get();
  await device.disconnect();
  return status.dps;
}

module.exports = {
  setPower,
  getStatus
};
