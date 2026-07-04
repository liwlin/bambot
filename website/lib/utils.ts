import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a servo position to an angle.
 * @param position - The servo position.
 * @param maxPosition - The servo's maximum position value.
 * @returns The corresponding angle (0 to 360 degrees).
 */
export function servoPositionToAngle(
  position: number,
  maxPosition = 4095
): number {
  if (maxPosition <= 0) return 0;
  return (position / maxPosition) * 360;
}

/**
 * Converts radians to degrees.
 * @param radians - The value in radians.
 * @returns The value in degrees.
 */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Converts degrees to radians.
 * @param degrees - The value in degrees.
 * @returns The value in radians.
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Converts radians to a servo position.
 * @param radians - The value in radians.
 * @param maxPosition - The servo's maximum position value.
 * @returns The corresponding servo position.
 */
export function radiansToServoPosition(
  radians: number,
  maxPosition = 4095
): number {
  return Math.max(
    0,
    Math.min(Math.round((radians * maxPosition) / (2 * Math.PI)), maxPosition)
  );
}

/**
 * Converts degrees to a servo position.
 * @param degrees - The value in degrees.
 * @param maxPosition - The servo's maximum position value.
 * @returns The corresponding servo position.
 */
export function degreesToServoPosition(
  degrees: number,
  maxPosition = 4095
): number {
  return Math.max(
    0,
    Math.min(Math.round((degrees * maxPosition) / 360), maxPosition)
  );
}
