# feetech.js

> [bambot.org/feetech.js](https://bambot.org/feetech.js)

Control feetech servos through browser

Current project repository: https://github.com/liwlin/bambot

## Quick start

```bash
# Install the package
npm install feetech.js
```

```javascript
import { ScsServoSDK } from "feetech.js";
const scsServoSdk = new ScsServoSDK();

// request permission to access the USB device and connect to it
// Note: This will prompt the user to select a USB device
await scsServoSdk.connect();

// read servo position
const position = await scsServoSdk.readPosition(1);
console.log(position); // 1122
```

## Servo profile support

This fork adds SCS225/SCSCL compatibility while keeping STS/SMS behavior:

| Profile | Aliases | Position range | Protocol end |
| --- | --- | --- | --- |
| STS/SMS | `sms_sts`, `sts`, `sms`, `sts3215` | `0-4095` | `0` |
| SCS/SCSCL/SCS225 | `scscl`, `scs`, `scs225` | `0-1023` | `1` |

Use automatic detection when several known IDs are installed:

```javascript
await scsServoSdk.connect({
  servoModel: "auto",
  detectionServoIds: [1, 2, 3, 4, 5],
});
```

Or force SCS225 when the hardware type is known:

```javascript
const scs225Sdk = new ScsServoSDK({ servoModel: "scs225" });
await scs225Sdk.connect({ servoModel: "scs225" });
await scs225Sdk.writePosition(1, 512);
```

For SCS225, unsupported STS-only features such as acceleration and position correction are disabled by profile. Missing servos, such as an uninstalled ID 6, should be skipped by the UI rather than blocking the remaining joints.

## Documentations

https://deepwiki.com/liwlin/bambot/5.1-sdk-overview-and-api


## Example usage:

- Test and config servos: [bambot.org/feetech.js](https://bambot.org/feetech.js)
- Simple html + js example: [test.html](https://github.com/liwlin/bambot/blob/main/feetech.js/test.html)
- Control different bots: [bambot.org](https://bambot.org)

## Ref

- https://github.com/Adam-Software/Feetech-Servo-SDK
