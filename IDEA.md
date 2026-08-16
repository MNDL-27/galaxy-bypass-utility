# Project Ideas & Roadmap Notes

## Planned Features
- Device compatibility checker (detect model via `adb shell getprop ro.product.model` before running commands)
- `adb wait-for-device` timeout with user-visible countdown
- Multi-language support (UI strings in separate config file)
- Performance monitoring: log thermal state before/after bypass via `dumpsys thermalservice`

## Known Limitations
- S21 FE cannot physically enable bypass charging (no hardware support)
- A/M series lack GOS — `pm disable-user` commands will fail silently
- `wait-for-device` blocks indefinitely without Ctrl+C

## Design Constraints
- Single static `.bat` file + bundled ADB. No installer, no runtime deps.
- All changes must be reversible through option [2] Restore Defaults.
- No root required. ADB-only commands.
