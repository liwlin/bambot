// Import all functions from the new scsServoSDK module

// Export the class and singleton instance
export { ScsServoSDK, scsServoSDK } from "./scsServoSDK.mjs";
export {
  SERVO_PROFILES,
  normalizeServoProfileId,
  getServoProfile,
} from "./scsservo_constants.mjs";

// Future: You can add exports for other servo types here, e.g.:
// export { stsServoSDK } from './stsServoSDK.mjs';
// export { smsServoSDK } from './smsServoSDK.mjs';
