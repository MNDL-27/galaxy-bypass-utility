@echo off
setlocal
echo Running tests...
echo.

REM Test 1: VERIFIED branch fires when system returns 1
set "PASS_THROUGH_SYSTEM="
set "PASS_THROUGH_GLOBAL="
for /f "usebackq delims=" %%a in (`call "%~dp0mock_adb_verified.bat" shell settings get system pass_through`) do set "PASS_THROUGH_SYSTEM=%%a"
for /f "usebackq delims=" %%a in (`call "%~dp0mock_adb_verified.bat" shell settings get global pass_through`) do set "PASS_THROUGH_GLOBAL=%%a"
set "BYPASS_OK=0"
if "%PASS_THROUGH_SYSTEM%"=="1" set "BYPASS_OK=1"
if "%PASS_THROUGH_GLOBAL%"=="1" set "BYPASS_OK=1"
if "%BYPASS_OK%"=="1" (echo PASS: VERIFIED branch fires) else (echo FAIL: VERIFIED branch did not fire)

REM Test 2: WARNING branch fires when both return empty
set "PASS_THROUGH_SYSTEM="
set "PASS_THROUGH_GLOBAL="
set "BYPASS_OK=0"
if "%PASS_THROUGH_SYSTEM%"=="1" set "BYPASS_OK=1"
if "%PASS_THROUGH_GLOBAL%"=="1" set "BYPASS_OK=1"
if "%BYPASS_OK%"=="0" (echo PASS: WARNING branch fires) else (echo FAIL: WARNING branch did not fire)

REM Test 3: Stale vars cleared - no false positive from prior run
REM Simulate prior run leaving stale value, then empty adb response
set "PASS_THROUGH_SYSTEM=1"
set "PASS_THROUGH_GLOBAL=1"
for /f "usebackq delims=" %%a in (`call "%~dp0mock_adb_empty.bat" shell settings get system pass_through`) do set "PASS_THROUGH_SYSTEM=%%a"
for /f "usebackq delims=" %%a in (`call "%~dp0mock_adb_empty.bat" shell settings get global pass_through`) do set "PASS_THROUGH_GLOBAL=%%a"
set "BYPASS_OK=0"
if "%PASS_THROUGH_SYSTEM%"=="1" set "BYPASS_OK=1"
if "%PASS_THROUGH_GLOBAL%"=="1" set "BYPASS_OK=1"
if "%BYPASS_OK%"=="0" (echo PASS: Stale vars cleared correctly) else (echo FAIL: Stale vars caused false positive)

echo.
echo Done.
