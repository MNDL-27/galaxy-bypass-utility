@echo off
cls
title Samsung Galaxy Power Bypass Tool

REM Set up local ADB path
set "ADB_PATH=%~dp0adb"
set "PATH=%ADB_PATH%;%PATH%"

REM Check if local ADB exists
if not exist "%ADB_PATH%\adb.exe" (
    echo.
    echo  ========================================================
    echo  ^|                    ERROR                             ^|
    echo  ========================================================
    echo.
    echo  ADB files not found in the 'adb' folder.
    echo  Please make sure the ADB platform tools are included
    echo  in the 'adb' subfolder of this tool.
    echo.
    pause
    exit /b 1
)

:menu
cls
echo.
echo  ========================================================
echo  ^|                                                      ^|
echo  ^|             SAMSUNG GALAXY POWER BYPASS TOOL         ^|
echo  ^|                        v2.1                          ^|
echo  ========================================================
echo.
echo  Choose an action:
echo.
echo    [1] Full Gaming Boost (Enable Bypass + Disable GOS stack)
echo    [2] Restore Defaults (Disable Bypass + Enable GOS stack)
echo    --------------------------------------------------------
echo    [3] Enable Power Bypass only
echo    [4] Disable Power Bypass only
echo    [5] Disable Game Tools only
echo    [6] Disable Game Launcher only
echo    [7] Disable GOS only
echo    [8] Enable Game Tools only
echo    [9] Enable Game Launcher only
echo    [10] Enable GOS only
echo    --------------------------------------------------------
echo    [11] Exit
echo.
set /p choice="Enter your choice [1-11]: "

if "%choice%"=="1" goto enable_bypass
if "%choice%"=="2" goto disable_bypass
if "%choice%"=="3" goto enable_bypass_only
if "%choice%"=="4" goto disable_bypass_only
if "%choice%"=="5" goto disable_gametools_only
if "%choice%"=="6" goto disable_gamehome_only
if "%choice%"=="7" goto disable_gos_only
if "%choice%"=="8" goto enable_gametools_only
if "%choice%"=="9" goto enable_gamehome_only
if "%choice%"=="10" goto enable_gos_only
if "%choice%"=="11" goto exit

echo Invalid choice. Please try again.
timeout /t 2 >nul
goto menu

:ensure_device
echo.
echo  Waiting for ADB device...
"%ADB_PATH%\adb.exe" wait-for-device
if errorlevel 1 (
    echo  ERROR: Could not connect to device. Please check USB connection and debugging.
    pause
    goto menu
)
echo  Device detected!
goto :eof

:enable_pass_through
echo  Enabling Power Bypass...
"%ADB_PATH%\adb.exe" shell settings put system pass_through 1
"%ADB_PATH%\adb.exe" shell settings put global pass_through 1
echo      ^> DONE
echo.
echo  Verifying Power Bypass setting...
for /f "usebackq delims=" %%a in (`"%ADB_PATH%\adb.exe" shell settings get system pass_through`) do set "PASS_THROUGH_SYSTEM=%%a"
for /f "usebackq delims=" %%a in (`"%ADB_PATH%\adb.exe" shell settings get global pass_through`) do set "PASS_THROUGH_GLOBAL=%%a"
if not "%PASS_THROUGH_SYSTEM%"=="1" if not "%PASS_THROUGH_GLOBAL%"=="1" (
    echo      ^> WARNING: Power Bypass setting not detected.
    echo      ^> This device may not support bypass charging (e.g., some S21 FE units).
) else (
    echo      ^> VERIFIED
)
echo.
echo  --------------------------------------------------------
echo  ^|  CHARGE LIMIT NOTICE                                ^|
echo  --------------------------------------------------------
echo  When Power Bypass is active, your battery will charge
echo  up to 20%% and then stop. This is NORMAL and expected.
echo  The charger powers the phone directly, keeping the
echo  battery cool during gaming. This is not a bug.
echo  --------------------------------------------------------
echo.
goto :eof

:disable_pass_through
echo  Disabling Power Bypass...
"%ADB_PATH%\adb.exe" shell settings put system pass_through 0
"%ADB_PATH%\adb.exe" shell settings put global pass_through 0
echo      ^> DONE
echo.
goto :eof

:disable_gametools
echo  Disabling Game Tools...
"%ADB_PATH%\adb.exe" shell pm disable-user com.samsung.android.game.gametools
echo      ^> DONE
echo.
goto :eof

:enable_gametools
echo  Enabling Game Tools...
"%ADB_PATH%\adb.exe" shell pm enable com.samsung.android.game.gametools
echo      ^> DONE
echo.
goto :eof

:disable_gamehome
echo  Disabling Game Launcher...
"%ADB_PATH%\adb.exe" shell pm disable-user com.samsung.android.game.gamehome
echo      ^> DONE
echo.
goto :eof

:enable_gamehome
echo  Enabling Game Launcher...
"%ADB_PATH%\adb.exe" shell pm enable com.samsung.android.game.gamehome
echo      ^> DONE
echo.
goto :eof

:disable_gos
echo  Disabling Game Optimization Service (GOS)...
"%ADB_PATH%\adb.exe" shell pm disable-user com.samsung.android.game.gos
echo      ^> DONE
echo.
goto :eof

:enable_gos
echo  Enabling Game Optimization Service (GOS)...
"%ADB_PATH%\adb.exe" shell pm enable com.samsung.android.game.gos
echo      ^> DONE
echo.
goto :eof

:enable_bypass
cls
echo.
echo  ========================================================
echo  ^|        FULL GAMING BOOST - ENABLE BYPASS + GOS OFF  ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo  Starting optimization process...
echo.
timeout /t 2 >nul
call :enable_pass_through
call :disable_gametools
call :disable_gamehome
call :disable_gos
echo  ========================================================
echo  ^|         PROCESS COMPLETE - POWER BYPASS ENABLED      ^|
echo  ========================================================
echo.
echo  Power Bypass is now active and GOS has been disabled.
echo.
pause
goto menu

:disable_bypass
cls
echo.
echo  ========================================================
echo  ^|      RESTORE DEFAULTS - BYPASS OFF + GOS ON           ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo  Starting restoration process...
echo.
timeout /t 2 >nul
call :disable_pass_through
call :enable_gametools
call :enable_gamehome
call :enable_gos
echo  ========================================================
echo  ^|      PROCESS COMPLETE - DEVICE RESTORED TO NORMAL    ^|
echo  ========================================================
echo.
echo  Your device has been restored to its default configuration.
echo.
pause
goto menu

:enable_bypass_only
cls
echo.
echo  ========================================================
echo  ^|              ENABLE POWER BYPASS ONLY               ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo.
timeout /t 1 >nul
call :enable_pass_through
pause
goto menu

:disable_bypass_only
cls
echo.
echo  ========================================================
echo  ^|              DISABLE POWER BYPASS ONLY              ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo.
timeout /t 1 >nul
call :disable_pass_through
pause
goto menu

:disable_gametools_only
cls
echo.
echo  ========================================================
echo  ^|               DISABLE GAME TOOLS ONLY               ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo.
timeout /t 1 >nul
call :disable_gametools
pause
goto menu

:disable_gamehome_only
cls
echo.
echo  ========================================================
echo  ^|             DISABLE GAME LAUNCHER ONLY              ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo.
timeout /t 1 >nul
call :disable_gamehome
pause
goto menu

:disable_gos_only
cls
echo.
echo  ========================================================
echo  ^|                DISABLE GOS ONLY                     ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo.
timeout /t 1 >nul
call :disable_gos
pause
goto menu

:enable_gametools_only
cls
echo.
echo  ========================================================
echo  ^|                ENABLE GAME TOOLS ONLY               ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo.
timeout /t 1 >nul
call :enable_gametools
pause
goto menu

:enable_gamehome_only
cls
echo.
echo  ========================================================
echo  ^|              ENABLE GAME LAUNCHER ONLY              ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo.
timeout /t 1 >nul
call :enable_gamehome
pause
goto menu

:enable_gos_only
cls
echo.
echo  ========================================================
echo  ^|                 ENABLE GOS ONLY                     ^|
echo  ========================================================
echo.
echo  (!) IMPORTANT: Please ensure your phone is connected to your PC
echo      with USB Debugging enabled before continuing.
echo.
pause
cls
call :ensure_device
echo.
timeout /t 1 >nul
call :enable_gos
pause
goto menu

:exit
exit
