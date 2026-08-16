# ADB Setup Guide

## Requirements
- Windows 10/11
- USB cable (data-capable, not charge-only)
- Samsung Galaxy S/Note/Z series device

## Enable USB Debugging
1. Settings → About Phone → tap Build Number 7 times
2. Settings → Developer Options → enable USB Debugging
3. Connect phone to PC via USB
4. Accept the RSA key prompt that appears on the device

## Verify ADB Connection
Run from the tool folder:

```
adb\adb.exe devices
```

Expected output: a device serial followed by `device`.

## Troubleshooting
- **Unauthorized**: Re-accept the RSA prompt on phone, or run `adb\adb.exe kill-server` then reconnect.
- **Offline**: Reconnect USB, try a different port.
- **No devices**: Check USB cable supports data transfer (not charge-only).
- **Tool hangs at "Waiting for device"**: Press Ctrl+C to cancel, then verify the above.
