"use client";

import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import {
  JointState,
  ServoSelection,
  UpdateJointDegrees,
  UpdateJointsDegrees,
  UpdateJointSpeed,
  UpdateJointsSpeed, // Add UpdateJointsSpeed type
} from "../../../hooks/useRobotControl"; // Adjusted import path
import { RevoluteJointsTable } from "./RevoluteJointsTable"; // Updated import path
import { ContinuousJointsTable } from "./ContinuousJointsTable"; // Updated import path
import { RobotConfig } from "@/config/robotConfig";
import useMeasure from "react-use-measure";
import { panelStyle } from "@/components/playground/panelStyle";
import { RobotConnectionHelpDialog } from "./RobotConnectionHelpDialog";

// const baudRate = 1000000; // Define baud rate for serial communication - Keep if needed elsewhere, remove if only for UI

// --- Control Panel Component ---
type ControlPanelProps = {
  jointStates: JointState[]; // Use JointState type from useRobotControl
  updateJointDegrees: UpdateJointDegrees; // Updated type
  updateJointsDegrees: UpdateJointsDegrees; // Updated type
  updateJointSpeed: UpdateJointSpeed; // Updated type
  updateJointsSpeed: UpdateJointsSpeed; // Add updateJointsSpeed
  servoProfile?: { label: string };
  servoSelection?: ServoSelection;
  onServoSelectionChange?: (selection: ServoSelection) => void;
  maxServoPosition?: number;
  availableServoIds?: number[];

  isConnected: boolean;

  connectRobot: () => void;
  disconnectRobot: () => void;
  keyboardControlMap: RobotConfig["keyboardControlMap"]; // New prop for keyboard control
  compoundMovements?: RobotConfig["compoundMovements"]; // Use type from robotConfig
  onHide?: () => void; // 新增 onHide 属性
  show?: boolean; // 新增 show 属性
};

export function ControlPanel({
  show = true,
  onHide,
  jointStates,
  updateJointDegrees,
  updateJointsDegrees,
  updateJointSpeed,
  updateJointsSpeed, // Pass updateJointsSpeed
  servoProfile,
  servoSelection = "auto",
  onServoSelectionChange,
  maxServoPosition = 4095,
  availableServoIds = [],
  isConnected,
  connectRobot,
  disconnectRobot,
  keyboardControlMap, // Destructure new prop
  compoundMovements, // Destructure new prop
}: ControlPanelProps) {
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "connecting" | "disconnecting"
  >("idle");
  const [ref, bounds] = useMeasure();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    if (bounds.height > 0 && !hasDragged) {
      setPosition((pos) => ({
        ...pos,
        x: window.innerWidth - bounds.width - 20,
        y: window.innerHeight - bounds.height - 20,
      }));
    }
  }, [bounds.height, hasDragged]);

  const handleConnect = async () => {
    setConnectionStatus("connecting");
    try {
      await connectRobot();
    } finally {
      setConnectionStatus("idle");
    }
  };

  const handleDisconnect = async () => {
    setConnectionStatus("disconnecting");
    try {
      await disconnectRobot();
    } finally {
      setConnectionStatus("idle");
    }
  };

  // Separate jointStates into revolute and continuous categories
  const revoluteJoints = jointStates.filter(
    (state) => state.jointType === "revolute"
  );
  const continuousJoints = jointStates.filter(
    (state) => state.jointType === "continuous"
  );
  const servoOptions: { value: ServoSelection; label: string }[] = [
    { value: "auto", label: "Auto" },
    { value: "sms_sts", label: "STS" },
    { value: "scscl", label: "SCS225" },
  ];

  return (
    <Rnd
      position={position}
      onDragStop={(_, d) => {
        setPosition({ x: d.x, y: d.y });
        setHasDragged(true);
      }}
      bounds="window"
      className="z-50"
      style={{ display: show ? undefined : "none" }}
    >
      <div
        ref={ref}
        className={"max-h-[80vh] overflow-y-auto text-sm " + panelStyle}
      >
        <h3 className="mt-0 mb-4 border-b border-white/50  pb-1 font-bold text-base flex justify-between items-center">
          <span>Joint Controls</span>
          <button
            onClick={onHide} // 优先调用 onHide
            onTouchEnd={onHide}
            className="ml-2 text-xl hover:bg-zinc-800 px-2 rounded-full"
            title="Collapse"
          >
            ×
          </button>
        </h3>

        {/* Revolute Joints Table */}
        {revoluteJoints.length > 0 && (
          <RevoluteJointsTable
            joints={revoluteJoints}
            updateJointDegrees={updateJointDegrees}
            updateJointsDegrees={updateJointsDegrees}
            keyboardControlMap={keyboardControlMap}
            compoundMovements={compoundMovements}
          />
        )}

        {/* Continuous Joints Table */}
        {continuousJoints.length > 0 && (
          <ContinuousJointsTable
            joints={continuousJoints}
            updateJointSpeed={updateJointSpeed}
            updateJointsSpeed={updateJointsSpeed} // Pass updateJointsSpeed to ContinuousJointsTable
          />
        )}

        {/* Connection Controls */}
        <div className="mt-3 border-t border-white/20 pt-3 text-xs text-zinc-400">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span>Servo type</span>
            <div className="flex rounded border border-white/20 bg-black/20 p-0.5">
              {servoOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={isConnected || connectionStatus !== "idle"}
                  onClick={() => onServoSelectionChange?.(option.value)}
                  className={`px-2 py-0.5 text-[11px] font-semibold transition ${
                    servoSelection === option.value
                      ? "bg-white text-zinc-900"
                      : "text-zinc-300 hover:bg-white/10"
                  } ${
                    isConnected || connectionStatus !== "idle"
                      ? "cursor-not-allowed opacity-70"
                      : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            Servo:{" "}
            {isConnected ? servoProfile?.label ?? "Auto detected" : "Auto detect"}
          </div>
          <div>Range: {isConnected ? `0-${maxServoPosition}` : "Auto"}</div>
          {isConnected && availableServoIds.length > 0 && (
            <div>Active IDs: {availableServoIds.join(", ")}</div>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center gap-2">
          <button
            onClick={isConnected ? handleDisconnect : handleConnect}
            disabled={connectionStatus !== "idle"}
            className={`text-white text-sm px-3 py-1.5 rounded flex-1 ${
              isConnected
                ? "bg-red-600 hover:bg-red-500"
                : "bg-blue-600 hover:bg-blue-500"
            } ${
              connectionStatus !== "idle" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {connectionStatus === "connecting"
              ? "Connecting..."
              : connectionStatus === "disconnecting"
              ? "Disconnecting..."
              : isConnected
              ? "Disconnect Robot"
              : "Connect Follower Robot"}
          </button>
          <RobotConnectionHelpDialog />
        </div>
      </div>
    </Rnd>
  );
}
