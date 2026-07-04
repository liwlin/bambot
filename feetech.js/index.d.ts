export type ConnectionOptions = {
  baudRate?: number;
  protocolEnd?: number;
  servoModel?: "auto" | "sms_sts" | "sts" | "sms" | "scscl" | "scs" | "scs225";
  servoType?: ConnectionOptions["servoModel"];
  detectionServoIds?: number[];
  detectServoIds?: number[];
};

export type ServoPositions = Map<number, number> | Record<number, number>;
export type ServoSpeeds = Map<number, number> | Record<number, number>; // New type alias for speeds
export type ServoProfileId = "sms_sts" | "scscl";
export type ServoProfile = {
  id: ServoProfileId;
  label: string;
  protocolEnd: number;
  expectedModelNumbers?: number[];
  maxPosition: number;
  wheelSpeedMax: number;
  supportsAcceleration: boolean;
  supportsPositionCorrection: boolean;
  addresses: Record<string, number | null>;
};

export declare class ScsServoSDK {
  constructor(options?: { servoModel?: ConnectionOptions["servoModel"]; servoType?: ConnectionOptions["servoType"] });
  connect(options?: ConnectionOptions): Promise<true>;
  disconnect(): Promise<true>;
  setServoProfile(profileId?: ConnectionOptions["servoModel"]): ServoProfile;
  getServoProfile(): ServoProfile;
  getPositionRange(): { min: number; max: number };
  detectServoProfile(servoIds?: number[]): Promise<unknown>;
  readModelNumber(servoId: number): Promise<number>;
  readPosition(servoId: number): Promise<number>;
  readBaudRate(servoId: number): Promise<number>;
  readMode(servoId: number): Promise<number>;
  writePosition(servoId: number, position: number): Promise<"success">;
  writeTorqueEnable(servoId: number, enable: boolean): Promise<"success">;
  writeAcceleration(servoId: number, acceleration: number): Promise<"success">;
  setWheelMode(servoId: number): Promise<"success">;
  setPositionMode(servoId: number): Promise<"success">;
  writeWheelSpeed(servoId: number, speed: number): Promise<"success">;
  syncReadPositions(servoIds: number[]): Promise<Map<number, number>>;
  syncWritePositions(servoPositions: ServoPositions): Promise<"success">;
  syncWriteWheelSpeed(servoSpeeds: ServoSpeeds): Promise<"success">;
  setBaudRate(servoId: number, baudRateIndex: number): Promise<"success">;
  setServoId(currentServoId: number, newServoId: number): Promise<"success">;
  readMaxPosLimit(servoId: number): Promise<number>;
  writeMaxPosLimit(servoId: number, limit: number): Promise<"success">;
  readMinPosLimit(servoId: number): Promise<number>;
  writeMinPosLimit(servoId: number, limit: number): Promise<"success">;
  syncReadMaxPosLimits(servoIds: number[]): Promise<Map<number, number>>;
  syncWriteMaxPosLimits(servoLimits: ServoPositions): Promise<"success">;
  syncReadMinPosLimits(servoIds: number[]): Promise<Map<number, number>>;
  syncWriteMinPosLimits(servoLimits: ServoPositions): Promise<"success">;
  readPosCorrection(servoId: number): Promise<number>;
  writePosCorrection(servoId: number, correction: number): Promise<"success">;
  syncReadPosCorrection(servoIds: number[]): Promise<Map<number, number>>;
  syncWritePosCorrection(servoCorrections: ServoPositions): Promise<"success">;
}

export declare const scsServoSDK: ScsServoSDK;
export declare const SERVO_PROFILES: Record<ServoProfileId, ServoProfile>;
export declare function normalizeServoProfileId(profileId?: string): ServoProfileId | "auto";
export declare function getServoProfile(profileId?: string): ServoProfile | null;
