import assert from "node:assert/strict";
import { ScsServoSDK } from "../index.mjs";

function makeConnectedSdk() {
  const sdk = new ScsServoSDK();
  sdk.portHandler = { isOpen: true };
  sdk.packetHandler = {};
  return sdk;
}

async function testSCS225AutoDetectionWithMissingServo() {
  const sdk = makeConnectedSdk();

  sdk.readModelNumber = async (servoId) => {
    if (servoId === 6) {
      throw new Error("[TxRxResult] There is no status packet!");
    }
    return sdk.getServoProfile().id === "scscl" ? 225 : 57600;
  };

  sdk.readPosition = async (servoId) => {
    if (servoId === 6) {
      throw new Error("[TxRxResult] There is no status packet!");
    }
    return sdk.getServoProfile().id === "scscl" ? 217 : 55552;
  };

  sdk.readMaxPosLimit = async (servoId) => {
    if (servoId === 6) {
      throw new Error("[TxRxResult] There is no status packet!");
    }
    return sdk.getServoProfile().id === "scscl" ? 1023 : 65283;
  };

  const detection = await sdk.detectServoProfile([1, 6]);
  assert.equal(detection.selectedProfile.id, "scscl");
  assert.equal(sdk.getServoProfile().maxPosition, 1023);
  assert.equal(sdk.getServoProfile().protocolEnd, 1);
}

async function testManualSCS225Profile() {
  const sdk = new ScsServoSDK({ servoModel: "scs225" });
  const profile = sdk.getServoProfile();
  assert.equal(profile.id, "scscl");
  assert.equal(profile.maxPosition, 1023);
}

await testSCS225AutoDetectionWithMissingServo();
await testManualSCS225Profile();
console.log("SCS225 compatibility checks passed.");
