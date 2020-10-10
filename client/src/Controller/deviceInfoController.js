import DeviceInfo from 'react-native-device-info';
import RNIEMI from 'react-native-imei';
import RNLocationHandler from 'react-native-location';

import {PermissionsAndroid, Alert} from 'react-native';
class DeviceInfoController {
  constructor() {
    this.deviceInfo = {
      osName: 'android',
      deviceName: 'n/a',
      macAddress: 'n/a',
      imei: 'n/a',
      location: {long: 1, latt: 1},
      publicIP: 'xyz.xyz.x.x',
    };
    this.loadcount = 0;
    this._onDataLoaded = null;

    this.handleDataLoaded = () => {
      if (this.loadcount === 5) {
        if (this._onDataLoaded) {
          this._onDataLoaded(this.deviceInfo);
        }
      }
    };

    this.getLocatonPermisson = () => {
      return new Promise((resolve, reject) => {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
          .then((isGranted) => {
            if (!isGranted) {
              PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
              ])
                .then((hasUserGranted) => {
                  if (
                    hasUserGranted[
                      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    ] !== 'denied'
                  ) {
                    resolve(true);
                  } else {
                    reject('Permission Denied By User');
                  }
                })
                .catch((err) => {
                  reject('No Permission LOCATION: Please restart app');
                });
            } else {
              resolve(true);
            }
          })
          .catch((err) => {
            reject('No Permission LOCATION: Please restart app');
          });
      });
    };

    this.getPermissionsAndTakeInfoIEMI_LOCATION = () => {
      this.getLocatonPermisson()
        .then((res) => {
          RNLocationHandler.getLatestLocation({
            distanceFilter: 100, // Meters
            desiredAccuracy: {
              ios: 'best',
              android: 'balancedPowerAccuracy',
            },
            // Android only
            androidProvider: 'auto',
            interval: 5000, // Milliseconds
            fastestInterval: 10000, // Milliseconds
            maxWaitTime: 5000, // Milliseconds
            // iOS Only
            activityType: 'other',
            allowsBackgroundLocationUpdates: false,
            headingFilter: 1, // Degrees
            headingOrientation: 'portrait',
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
          })
            .then((loc) => {
              this.deviceInfo.location.latt = loc.latitude;
              this.deviceInfo.location.long = loc.longitude;
              this.loadcount++;
              this.handleDataLoaded();
            })
            .catch((err) => {
              this.loadcount++;
              this.handleDataLoaded();
            });
          this.getDeviceInfoPermission()
            .then((grand) => {
              this.deviceInfo.imei = RNIEMI.getImei()
                .then((iemi) => {
                  let imes = '';
                  for (let index = 0; index < iemi.length; index++) {
                    const imi = iemi[index];
                    imes = `${imes} ${imi}`;
                  }
                  this.deviceInfo.imei = imes;
                  this.loadcount++;
                  this.handleDataLoaded();
                })
                .catch((err) => {
                  this.loadcount++;
                  this.handleDataLoaded();
                });
              this.getWifiStatePermission()
                .then((g) => {
                  DeviceInfo.getMacAddress()
                    .then((macAddress) => {
                      this.deviceInfo.macAddress = macAddress;
                      this.loadcount++;
                      this.handleDataLoaded();
                    })
                    .catch((error) => {
                      this.loadcount++;
                      this.handleDataLoaded();
                    });
                })
                .catch((err) => {
                  this.loadcount++;
                  this.handleDataLoaded();
                });
            })
            .catch((Err) => {
              this.getWifiStatePermission()
                .then((g) => {
                  DeviceInfo.getMacAddress()
                    .then((mac) => {
                      this.deviceInfo.macAddress = macAddress;
                      this.loadcount++;
                      this.handleDataLoaded();
                    })
                    .catch((error) => {
                      this.loadcount++;
                      this.handleDataLoaded();
                    });
                })
                .catch((err) => {
                  this.loadcount++;
                  this.handleDataLoaded();
                });
              this.loadcount++;
              this.handleDataLoaded();
            });
        })
        .catch((err) => {
          this.getDeviceInfoPermission()
            .then((grand) => {
              this.deviceInfo.imei = RNIEMI.getImei()
                .then((iemi) => {
                  let imes = '';
                  for (let index = 0; index < iemi.length; index++) {
                    const imi = iemi[index];
                    imes = `${imes} ${imi}`;
                  }
                  this.deviceInfo.imei = imes;
                  this.loadcount++;
                  this.handleDataLoaded();
                })
                .catch((err) => {
                  this.loadcount++;
                  this.handleDataLoaded();
                });
              this.getWifiStatePermission()
                .then((g) => {
                  DeviceInfo.getMacAddress()
                    .then((mac) => {
                      this.deviceInfo.macAddress = macAddress;
                      this.loadcount++;
                      this.handleDataLoaded();
                    })
                    .catch((error) => {
                      this.loadcount++;
                      this.handleDataLoaded();
                    });
                })
                .catch((err) => {
                  this.loadcount++;
                  this.handleDataLoaded();
                });
            })
            .catch((Err) => {
              this.getWifiStatePermission()
                .then((g) => {
                  DeviceInfo.getMacAddress()
                    .then((mac) => {
                      this.deviceInfo.macAddress = macAddress;
                      this.loadcount++;
                      this.handleDataLoaded();
                    })
                    .catch((error) => {
                      this.loadcount++;
                      this.handleDataLoaded();
                    });
                })
                .catch((err) => {
                  this.loadcount++;
                  this.handleDataLoaded();
                });
              this.loadcount++;
              this.handleDataLoaded();
            });
          this.loadcount++;
          this.handleDataLoaded();
        });
    };

    this.getDeviceInfoPermission = () => {
      return new Promise((resolve, reject) => {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        )
          .then((isGranted) => {
            if (!isGranted) {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
              )
                .then((hasUserGranted) => {
                  if (hasUserGranted !== 'denied') {
                    resolve(true);
                  } else {
                    reject('Permission Denied By User');
                  }
                })
                .catch((err) => {
                  reject('No Permission IEMI: Please restart app');
                });
            } else {
              resolve(true);
            }
          })
          .catch((err) => {
            reject('No Permission IEMI: Please restart app');
          });
      });
    };

    this.getWifiStatePermission = () => {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    };

    this.loadInfo = (onDataLoaded) => {
      this.loadcount = 0;
      this._onDataLoaded = onDataLoaded;
      DeviceInfo.getDeviceName()
        .then((deviceName) => {
          this.deviceInfo.deviceName = deviceName;
          this.loadcount++;
          this.handleDataLoaded();
        })
        .catch((error) => {
          this.loadcount++;
          this.handleDataLoaded();
        });

      DeviceInfo.getIpAddress()
        .then((ipaddress) => {
          this.deviceInfo.publicIP = ipaddress;
          this.loadcount++;
          this.handleDataLoaded();
        })
        .catch((error) => {
          this.loadcount++;
          this.handleDataLoaded();
        });

      this.getPermissionsAndTakeInfoIEMI_LOCATION();

    };
  }
}
const MyDeviceInfoController = new DeviceInfoController();
export default MyDeviceInfoController;