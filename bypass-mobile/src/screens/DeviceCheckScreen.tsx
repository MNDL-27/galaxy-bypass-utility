import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DeviceInfo, getDeviceInfo } from '../utils/deviceInfo';

interface DeviceCheckScreenProps {
  onCheckComplete?: (info: DeviceInfo) => void;
  customDeviceInfo?: DeviceInfo | null;
}

export const DeviceCheckScreen: React.FC<DeviceCheckScreenProps> = ({
  onCheckComplete,
  customDeviceInfo,
}) => {
  const [loading, setLoading] = useState(!customDeviceInfo);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(customDeviceInfo || null);

  const runCheck = async () => {
    setLoading(true);
    const info = await getDeviceInfo();
    setDeviceInfo(info);
    setLoading(false);
    if (onCheckComplete) {
      onCheckComplete(info);
    }
  };

  useEffect(() => {
    if (!customDeviceInfo) {
      runCheck();
    }
  }, [customDeviceInfo]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Checking Device Compatibility...</Text>
      </View>
    );
  }

  if (!deviceInfo) {
    return null;
  }

  const getBannerStyle = () => {
    switch (deviceInfo.supportCategory) {
      case 'supported':
        return styles.supportedBanner;
      case 'warning':
        return styles.warningBanner;
      case 'unsupported':
      default:
        return styles.unsupportedBanner;
    }
  };

  const getBannerTitle = () => {
    switch (deviceInfo.supportCategory) {
      case 'supported':
        return 'SUPPORTED DEVICE';
      case 'warning':
        return 'HARDWARE LIMITATION WARNING';
      case 'unsupported':
        return 'UNSUPPORTED DEVICE';
      default:
        return 'UNKNOWN DEVICE';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.banner, getBannerStyle()]}>
        <Text style={styles.bannerTitle}>{getBannerTitle()}</Text>
        <Text style={styles.bannerModel}>Model: {deviceInfo.model || 'Unknown'}</Text>
        <Text style={styles.bannerReason}>{deviceInfo.reason}</Text>

        {deviceInfo.hasGOSWarning && (
          <View style={styles.warningBox}>
            <Text style={styles.warningBoxTitle}>⚠️ GOS & Power Bypass Warning</Text>
            <Text style={styles.warningBoxText}>
              Galaxy A/M series devices lack hardware power bypass support. GOS-dependent package disabling commands may fail or have no effect.
            </Text>
          </View>
        )}

        {deviceInfo.isS21FE && (
          <View style={styles.warningBox}>
            <Text style={styles.warningBoxTitle}>⚠️ Physical Hardware Restriction</Text>
            <Text style={styles.warningBoxText}>
              Galaxy S21 FE models physically lack the battery bypass circuit. Power bypass commands cannot be enabled on this hardware.
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.recheckButton} onPress={runCheck}>
        <Text style={styles.recheckButtonText}>Re-check Device</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  banner: {
    width: '100%',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  supportedBanner: {
    backgroundColor: '#D4EDDA',
    borderColor: '#C3E6CB',
    borderWidth: 1,
  },
  warningBanner: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFEEBA',
    borderWidth: 1,
  },
  unsupportedBanner: {
    backgroundColor: '#F8D7DA',
    borderColor: '#F5C6CB',
    borderWidth: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#155724',
  },
  bannerModel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#212529',
  },
  bannerReason: {
    fontSize: 14,
    color: '#383D41',
  },
  warningBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6,
  },
  warningBoxTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#856404',
    marginBottom: 4,
  },
  warningBoxText: {
    fontSize: 13,
    color: '#856404',
  },
  recheckButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  recheckButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
