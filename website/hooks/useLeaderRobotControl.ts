import { useState, useCallback, useRef } from "react";
import { ScsServoSDK } from "feetech.js";

type ServoProfile = {
  label: string;
  maxPosition: number;
};

const DEFAULT_SERVO_PROFILE: ServoProfile = {
  label: "STS/SMS",
  maxPosition: 4095,
};

export function useLeaderRobotControl(servoIds: number[]) {
  const scsServoSDK = useRef(new ScsServoSDK()).current;
  const [isConnected, setIsConnected] = useState(false);
  const [readableServoIds, setReadableServoIds] = useState<number[]>([]);
  const [servoProfile, setServoProfile] =
    useState<ServoProfile>(DEFAULT_SERVO_PROFILE);

  // Connect to leader robot
  const connectLeader = useCallback(async () => {
    try {
      await scsServoSDK.connect({
        servoModel: "auto",
        detectionServoIds: servoIds,
      });
      setServoProfile(scsServoSDK.getServoProfile());
      // Read initial positions to see which servos are readable
      const pos = await scsServoSDK.syncReadPositions(servoIds);
      const readable = Array.from(new Map(pos).keys());

      if (readable.length > 0) {
        for (const id of readable) {
          try {
            //disable torque for all servos
            await scsServoSDK.writeTorqueEnable(id, false);
          } catch (e) {
            console.warn(`Error disabling torque for servo ${id}:`, e);
          }
        }
      }
      setReadableServoIds(readable);
      setIsConnected(true);
    } catch (e) {
      setIsConnected(false);
      setReadableServoIds([]);
      alert(e);
      throw e;
    }
  }, [servoIds, scsServoSDK]);

  // Disconnect
  const disconnectLeader = useCallback(async () => {
    try {
      await scsServoSDK.disconnect();
    } finally {
      setIsConnected(false);
      setReadableServoIds([]);
    }
  }, [scsServoSDK]);

  // Get joint positions
  const getPositions = useCallback(async () => {
    if (!isConnected || readableServoIds.length === 0) return new Map();
    try {
      const pos = await scsServoSDK.syncReadPositions(readableServoIds);
      return new Map<number, number>(pos);
    } catch (e) {
      console.warn("Error reading positions:", e);
      return new Map();
    }
  }, [isConnected, readableServoIds, scsServoSDK]);

  return {
    isConnected,
    connectLeader,
    disconnectLeader,
    getPositions,
    servoProfile,
    positionMax: servoProfile.maxPosition,
  };
}
