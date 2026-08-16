# Changelog

All notable changes to Galaxy Bypass Utility will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-07-25

### 🐛 Fixed
- **Verification logic**: `pass_through` VERIFIED branch now prints correctly (was unreachable due to nested-if else pairing).
- **Stale variables**: Clear `PASS_THROUGH_SYSTEM`/`PASS_THROUGH_GLOBAL` before re-read to prevent false-positive VERIFIED when adb returns empty.
- **Variable leakage**: Added `setlocal` to prevent script vars from leaking into parent shell.
- **Device wait UX**: Added Ctrl+C hint to `wait-for-device` message.

### 📚 Added
- `ADB_SETUP.md`: USB debugging setup guide (was missing from repo despite CHANGELOG reference).
- `_test/`: Mock-ADB test harness — `run_tests.bat` exercises verification logic with stub adb. Windows-only.

### 🔄 Changed
- `IDEA.md`: Replaced unrelated SOCKS5/DPI tunnel draft with accurate project roadmap.

---

## [2.0.0] - 2025-09-28

### 🚀 Added
- **Standalone Edition**: Complete ADB Platform Tools included (v36.0.0)
- **Interactive Menu**: Unified console interface replacing separate scripts
- **Enhanced Error Handling**: Device detection and connection validation
- **Progress Indicators**: Real-time feedback during operations
- **Professional Documentation**: Comprehensive README with FAQ section
- **Community Features**: Issue templates, contributing guidelines, security policy
- **GitHub Actions**: Automated release packaging and health checks

### 🔄 Changed
- **Single Tool**: Consolidated `Enable_Power_Bypass.bat` and `Disable_Power_Bypass.bat` into one interactive utility
- **Local ADB**: Uses included ADB tools instead of system PATH requirements
- **User Experience**: Added version display and structured menu navigation
- **Documentation**: Complete overhaul with visual improvements and FAQ

### 🏗️ Technical Improvements
- **Path Independence**: Works from any folder location
- **Error Recovery**: Returns to menu on connection failures
- **Smart Detection**: Automatic ADB file validation on startup
- **Better Feedback**: Clear success/error messages throughout process

### 📦 Package Contents
- `Battery Bypass Tool.bat` - Main interactive utility
- `adb/` folder - Complete ADB Platform Tools
- `README.md` - Comprehensive documentation
- `CONTRIBUTING.md` - Community guidelines
- `SECURITY.md` - Security policy
- `ADB_SETUP.md` - Technical setup guide

---

## [1.0.0] - 2025-09-28 (Initial Release)

### ✨ Added
- Basic power bypass functionality
- GOS (Game Optimization Service) control
- Separate enable/disable batch scripts
- MIT license
- Basic README documentation

### 🎯 Features
- Enable/disable power bypass feature
- Control Samsung Game Optimization Service
- Simple batch script implementation
- ADB command automation

---

## Future Releases

### Planned Features
- 📱 Device compatibility checker
- 🖼️ Screenshots and demo videos  
- 🌐 Multi-language support
- 📊 Performance monitoring integration
- 🔧 Advanced configuration options

---

*For detailed release notes, visit the [Releases page](https://github.com/MNDL-27/galaxy-bypass-utility/releases).*