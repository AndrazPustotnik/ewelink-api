/**
 * Toggle power state for a specific device
 *
 * @param deviceId
 * @param channel
 *
 * @returns {Promise<{state: *, status: string}|{msg: string, error: *}>}
 */
export async function toggleDevice(deviceId, channel = 1) {
  return this.setDevicePowerState(deviceId, 'toggle', channel);
}
