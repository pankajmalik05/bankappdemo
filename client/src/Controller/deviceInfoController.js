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
        console.log('DONE');
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
            console.log('TEST 01-LOCATION, Is Granted ');
            console.log(isGranted);
            if (!isGranted) {
              PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
              ])
                .then((hasUserGranted) => {
                  console.log('Had User Granted LocaTION');
                  console.log(hasUserGranted);
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

        // requestMultiple([
        //   PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        //   PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        // ])
        //   .then((grandted) => {
        //     resolve(true);
        //   })
        //   .catch((err) => {
        //     console.log('CATCH, requst multiple location');
        //     console.log(err);
        //     reject(false);
        //   });
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
              console.log('LOCATION');
              console.log(loc);
              this.deviceInfo.location.latt = loc.latitude;
              this.deviceInfo.location.long = loc.longitude;
              this.loadcount++;
              console.log(`LOAD count ${this.loadcount}`);
              this.handleDataLoaded();
            })
            .catch((err) => {
              //   console.log();
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
                  console.log(this.loadcount);
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
                      // Alert.alert(macAddress);
                      console.log('OS NAME');
                      console.log(macAddress);
                      this.deviceInfo.macAddress = macAddress;
                      this.loadcount++;
                      this.handleDataLoaded();
                    })
                    .catch((error) => {
                      console.log('Catch, OS Name');
                      console.log(error);
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
                      // Alert.alert(macAddress);
                      console.log('OS NAME');
                      console.log(macAddress);
                      this.deviceInfo.macAddress = macAddress;
                      this.loadcount++;
                      this.handleDataLoaded();
                    })
                    .catch((error) => {
                      console.log('Catch, OS Name');
                      console.log(error);
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
                  console.log(this.loadcount);
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
                      // Alert.alert(macAddress);
                      console.log('OS NAME');
                      console.log(macAddress);
                      this.deviceInfo.macAddress = macAddress;
                      this.loadcount++;
                      this.handleDataLoaded();
                    })
                    .catch((error) => {
                      console.log('Catch, OS Name');
                      console.log(error);
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
                      // Alert.alert(macAddress);
                      console.log('OS NAME');
                      console.log(macAddress);
                      this.deviceInfo.macAddress = macAddress;
                      this.loadcount++;
                      this.handleDataLoaded();
                    })
                    .catch((error) => {
                      console.log('Catch, OS Name');
                      console.log(error);
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
                  console.log('Had User Granted PHONE STATE');
                  console.log(hasUserGranted);
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
        // PermissionsAndroid.check(
        //   PermissionsAndroid.PERMISSIONS.ACCESS_WIFI_STATE,
        // )
        //   .then((isGranted) => {
        //     if (!isGranted) {
        //       PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.ACCESS_WIFI_STATE,
        //       )
        //         .then((hasUserGranted) => {
        //           console.log('Had User Granted ACCESS_WIFI_STATE');
        //           console.log(hasUserGranted);
        //           if (hasUserGranted !== 'denied') {
        //             resolve(true);
        //           } else {
        //             reject('Permission Denied By User');
        //           }
        //         })
        //         .catch((err) => {
        //           reject('No Permission ACCESS_WIFI_STATE: Please restart app');
        //         });
        //     } else {
        //       resolve(true);
        //     }
        //   })
        //   .catch((err) => {
        //     reject('No Permission ACCESS_WIFI_STATE: Please restart app');
        //   });
      });
    };

    this.loadInfo = (onDataLoaded) => {
      this.loadcount = 0;
      this._onDataLoaded = onDataLoaded;
      DeviceInfo.getDeviceName()
        .then((deviceName) => {
          console.log('device name');
          console.log(deviceName);
          this.deviceInfo.deviceName = deviceName;
          this.loadcount++;
          this.handleDataLoaded();
        })
        .catch((error) => {
          console.log('Catch, Device name');
          console.log(error);
          this.loadcount++;
          this.handleDataLoaded();
        });
      // DeviceInfo.getMacAddress()
      //   .then((mac) => {
      //     Alert.alert(macAddress);
      //     console.log('OS NAME');
      //     console.log(macAddress);
      //     this.deviceInfo.macAddress = macAddress;
      //     this.loadcount++;
      //     this.handleDataLoaded();
      //   })
      //   .catch((error) => {
      //     console.log('Catch, OS Name');
      //     console.log(error);
      //     this.loadcount++;
      //     this.handleDataLoaded();
      //   });

      DeviceInfo.getIpAddress()
        .then((ipaddress) => {
          console.log('PUBLIC IP');
          console.log(ipaddress);
          this.deviceInfo.publicIP = ipaddress;
          this.loadcount++;
          this.handleDataLoaded();
        })
        .catch((error) => {
          console.log('Catch, IP address');
          console.log(error);
          this.loadcount++;
          this.handleDataLoaded();
        });

      // this.loadcount++;
      // this.loadcount++;
      // this.loadcount++;
      // this.loadcount++;
      // this.loadcount++;
      // this.handleDataLoaded();

      this.getPermissionsAndTakeInfoIEMI_LOCATION();

      // this.getDeviceInfoPermission()
      //   .then((granted) => {
      //     this.deviceInfo.imei = RNIEMI.getImei()
      //       .then((iemi) => {
      //         let imes = '';
      //         for (let index = 0; index < iemi.length; index++) {
      //           const imi = iemi[index];
      //           imes = `${imes} ${imi}`;
      //         }
      //         this.deviceInfo.imei = imes;
      //         this.loadcount++;
      //         console.log(this.loadcount);
      //         this.handleDataLoaded();
      //       })
      //       .catch((err) => {
      //         this.loadcount++;
      //         this.handleDataLoaded();
      //       });
      //   })
      //   .catch((err) => {
      //     console.log('NO Permission for Device info');
      //     this.loadcount++;
      //     this.handleDataLoaded();
      //   });

      // this.getLocatonPermisson()
      //   .then((isGranted) => {

      //   })
      //   .catch((err) => {
      //     console.log('Error in Geting permissio ');
      //     this.loadcount++;
      //     this.handleDataLoaded();
      //   });
    };
  }
}
const MyDeviceInfoController = new DeviceInfoController();
export default MyDeviceInfoController;