import { analyzeDeviceCompatibility } from './deviceInfo';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

function runTests() {
  // S20, S21, S22, S23, S24
  const s20 = analyzeDeviceCompatibility('SM-G981B');
  assert(s20.isSupported && s20.supportCategory === 'supported', 'SM-G981B should be supported (S20)');

  const s21 = analyzeDeviceCompatibility('SM-G998B');
  assert(s21.isSupported && s21.supportCategory === 'supported', 'SM-G998B should be supported (S21 Ultra)');

  const s22 = analyzeDeviceCompatibility('SM-S908B');
  assert(s22.isSupported && s22.supportCategory === 'supported', 'SM-S908B should be supported (S22 Ultra)');

  const s23 = analyzeDeviceCompatibility('SM-S918B');
  assert(s23.isSupported && s23.supportCategory === 'supported', 'SM-S918B should be supported (S23 Ultra)');

  const s24 = analyzeDeviceCompatibility('SM-S928B');
  assert(s24.isSupported && s24.supportCategory === 'supported', 'SM-S928B should be supported (S24 Ultra)');

  // Note20
  const note20 = analyzeDeviceCompatibility('SM-N986B');
  assert(note20.isSupported && note20.supportCategory === 'supported', 'SM-N986B should be supported (Note20 Ultra)');

  // Z Fold / Z Flip
  const zfold5 = analyzeDeviceCompatibility('SM-F946B');
  assert(zfold5.isSupported && zfold5.supportCategory === 'supported', 'SM-F946B should be supported (Z Fold 5)');

  const zflip5 = analyzeDeviceCompatibility('SM-F731B');
  assert(zflip5.isSupported && zflip5.supportCategory === 'supported', 'SM-F731B should be supported (Z Flip 5)');

  // S21 FE warning
  const s21fe = analyzeDeviceCompatibility('SM-G990B');
  assert(!s21fe.isSupported && s21fe.supportCategory === 'warning' && s21fe.isS21FE, 'SM-G990B should be S21 FE warning');

  // A / M series
  const a54 = analyzeDeviceCompatibility('SM-A546B');
  assert(!a54.isSupported && a54.supportCategory === 'unsupported' && a54.isAMSeries && a54.hasGOSWarning, 'SM-A546B should be unsupported A-series with GOS warning');

  const m51 = analyzeDeviceCompatibility('SM-M515F');
  assert(!m51.isSupported && m51.supportCategory === 'unsupported' && m51.isAMSeries && m51.hasGOSWarning, 'SM-M515F should be unsupported M-series with GOS warning');

  // Pre-2020 devices
  const s10 = analyzeDeviceCompatibility('SM-G973F');
  assert(!s10.isSupported && s10.supportCategory === 'unsupported', 'SM-G973F should be unsupported (S10 pre-2020)');

  // Non-Samsung
  const pixel = analyzeDeviceCompatibility('Pixel 7');
  assert(!pixel.isSamsung && pixel.supportCategory === 'unsupported', 'Pixel 7 should be unsupported non-Samsung');

  console.log('All deviceInfo tests passed successfully!');
}

runTests();
