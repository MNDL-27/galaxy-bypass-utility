# Galaxy Bypass Utility - Mobile (Sizuku)

Mobile version of the Galaxy Bypass Utility for Samsung devices, executing power bypass and GOS management commands directly on-device using Sizuku ADB shell permissions.

## Features
- Direct on-device execution via Sizuku service (no PC required after activation)
- Toggle Power Bypass (`pass_through`) system settings
- Enable / Disable Samsung GOS (Game Optimizing Service), Game Tools, and Game Launcher
- Device model compatibility verification

## Prerequisites & Sizuku Activation

Sizuku allows standard Android applications to execute ADB shell commands directly on device.

1. **Install Shizuku Companion App**:
   - Install Shizuku from Play Store or GitHub releases on your Samsung Galaxy device.

2. **Activate Shizuku**:
   - **Android 11+ (Wireless Debugging)**: Enable Developer Options -> Enable Wireless Debugging -> Pair and start Shizuku directly from the Shizuku app.
   - **Rooted Devices**: Grant root permission to Shizuku inside the app.
   - **PC ADB Activation** (if wireless debugging not available): Run `adb shell sh /sdcard/Android/data/moe.shizuku.privileged.api/start.sh` from a computer once per reboot.

3. **Grant Permission to Bypass App**:
   - Open Galaxy Bypass Utility Mobile.
   - Authorize Shizuku permission when prompted.

## Building with EAS (Expo Application Services)

### Setup EAS CLI
```bash
npm install -g eas-cli
eas login
```

### Build APK (Development / Testing)
```bash
cd bypass-mobile
eas build --platform android --profile development
# Or for direct standalone APK build without dev client:
eas build --platform android --profile preview
```

### Build AAB (Production / Play Store)
```bash
cd bypass-mobile
eas build --platform android --profile production
```

### Local Build (Optional)
```bash
cd bypass-mobile
eas build --platform android --profile preview --local
```
