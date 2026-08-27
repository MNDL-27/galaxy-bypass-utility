import { execCommand, CommandResult } from './sizuku';

export interface DeviceInfo {
  model: string; // e.g. SM-G998B or ro.product.model value
  samsungDevelopment: string; // ro.samsung.development value
  isSamsung: boolean;
  isSupported: boolean;
  supportCategory: 'supported' | 'unsupported' | 'warning' | 'unknown';
  reason?: string;
  isS21FE: boolean;
  isAMSeries: boolean;
  hasGOSWarning: boolean;
}

export type CommandExecutor = (command: string) => Promise<CommandResult>;

/**
 * Checks model string and samsung development properties against supported device criteria.
 * Supported: Galaxy S20, S21, S22, S23, S24, Note20, Z Fold, Z Flip series.
 * Warning: S21 FE (SM-G990, etc.) - cannot physically enable bypass.
 * Unsupported: Galaxy A / M series, pre-2020 devices, non-Samsung devices.
 */
export function analyzeDeviceCompatibility(model: string, samsungDev: string = ''): DeviceInfo {
  const modelUpper = model.trim().toUpperCase();
  const devUpper = samsungDev.trim().toUpperCase();

  // Basic Samsung identification
  // ro.samsung.development is present on Samsung firmware, or model starts with SM-
  const isSamsung = modelUpper.startsWith('SM-') || devUpper.length > 0 || modelUpper.includes('SAMSUNG') || modelUpper.includes('GALAXY');

  // Check A/M series
  // Samsung A series models usually SM-Axxx (e.g. SM-A525F, SM-A546B) or named Galaxy A
  // Samsung M series models usually SM-Mxxx (e.g. SM-M515F, SM-M336B) or named Galaxy M
  const isAMSeries = /^SM-[AM]\d+/i.test(modelUpper) || /\bGALAXY [AM]\d+/i.test(modelUpper);

  // S21 FE check: SM-G990B, SM-G990U, SM-G990W, etc., or contains "S21 FE"
  const isS21FE = /^SM-G990/i.test(modelUpper) || modelUpper.includes('S21 FE') || modelUpper.includes('S21FE');

  if (!isSamsung && modelUpper.length > 0) {
    return {
      model,
      samsungDevelopment: samsungDev,
      isSamsung: false,
      isSupported: false,
      supportCategory: 'unsupported',
      reason: 'Device is not a Samsung Galaxy phone.',
      isS21FE: false,
      isAMSeries: false,
      hasGOSWarning: false,
    };
  }

  if (isAMSeries) {
    return {
      model,
      samsungDevelopment: samsungDev,
      isSamsung: true,
      isSupported: false,
      supportCategory: 'unsupported',
      reason: 'Galaxy A/M series devices do not support hardware power bypass.',
      isS21FE: false,
      isAMSeries: true,
      hasGOSWarning: true,
    };
  }

  if (isS21FE) {
    return {
      model,
      samsungDevelopment: samsungDev,
      isSamsung: true,
      isSupported: false,
      supportCategory: 'warning',
      reason: 'Galaxy S21 FE hardware cannot physically enable battery bypass.',
      isS21FE: true,
      isAMSeries: false,
      hasGOSWarning: false,
    };
  }

  // Check supported flagship models:
  // S20: SM-G980, SM-G981, SM-G985, SM-G986, SM-G988
  // S21: SM-G991, SM-G996, SM-G998 (excluding SM-G990 which is S21 FE)
  // S22: SM-S901, SM-S906, SM-S908
  // S23: SM-S911, SM-S916, SM-S918, SM-S910
  // S24: SM-S921, SM-S926, SM-S928
  // Note20: SM-N980, SM-N981, SM-N985, SM-N986
  // Z Fold: SM-F900, SM-F907, SM-F916, SM-F926, SM-F936, SM-F946, SM-F956
  // Z Flip: SM-F700, SM-F707, SM-F711, SM-F721, SM-F731, SM-F741
  const supportedRegex = /^SM-(G98[01568]|G99[168]|S90[168]|S91[168]|S92[168]|N98[0156]|F9[012345][0-9]|F7[01234][0-9])/i;

  // Generic keyword match in case user custom model string
  const isSupportedKeyword = /GALAXY (S20|S21|S22|S23|S24|NOTE20|NOTE 20|Z FOLD|Z FLIP)/i.test(modelUpper);

  if (supportedRegex.test(modelUpper) || isSupportedKeyword) {
    return {
      model,
      samsungDevelopment: samsungDev,
      isSamsung: true,
      isSupported: true,
      supportCategory: 'supported',
      reason: 'Device model fully supports battery bypass features.',
      isS21FE: false,
      isAMSeries: false,
      hasGOSWarning: false,
    };
  }

  // Check for pre-2020 or unrecognized Galaxy models (e.g. S10 SM-G973, S9 SM-G960, Note10 SM-N970)
  const isOlderGalaxy = /^SM-(G97[0-9]|G96[0-9]|G95[0-9]|N97[0-9]|N96[0-9]|N95[0-9])/i.test(modelUpper);

  if (isOlderGalaxy) {
    return {
      model,
      samsungDevelopment: samsungDev,
      isSamsung: true,
      isSupported: false,
      supportCategory: 'unsupported',
      reason: 'Pre-2020 Galaxy devices (S10/Note10 and older) do not support battery bypass.',
      isS21FE: false,
      isAMSeries: false,
      hasGOSWarning: false,
    };
  }

  // Unknown model
  return {
    model,
    samsungDevelopment: samsungDev,
    isSamsung: true,
    isSupported: false,
    supportCategory: 'unknown',
    reason: 'Device model is not recognized in the supported list. Proceed with caution.',
    isS21FE: false,
    isAMSeries: false,
    hasGOSWarning: false,
  };
}

/**
 * Executes getprop commands via Sizuku to detect device model and compatibility.
 */
export async function getDeviceInfo(executor: CommandExecutor = execCommand): Promise<DeviceInfo> {
  try {
    const modelResult = await executor('getprop ro.product.model');
    const devResult = await executor('getprop ro.samsung.development');

    const model = modelResult.stdout ? modelResult.stdout.trim() : 'Unknown';
    const samsungDev = devResult.stdout ? devResult.stdout.trim() : '';

    return analyzeDeviceCompatibility(model, samsungDev);
  } catch (error) {
    return {
      model: 'Unknown',
      samsungDevelopment: '',
      isSamsung: false,
      isSupported: false,
      supportCategory: 'unknown',
      reason: `Failed to execute device check commands: ${(error as Error).message}`,
      isS21FE: false,
      isAMSeries: false,
      hasGOSWarning: false,
    };
  }
}
