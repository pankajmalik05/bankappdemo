import Axios from 'axios';
import {LOGOUT, SET_CURRENT_USER} from './types';
import {BASE_URL} from '../../proxy';
import store from '../index';
import MyDeviceInfoController from '../../Controller/deviceInfoController';
const setCurrentUser = (user) => {
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};

export const updateInfo = () => {};

// export const getDeviceInfo = () => {
//   return {
//     osName: 'dummy',
//     deviceName: 'dummy',
//     macAddress: 'dummy',
//     imei: 'dummy',
//     location: {long: 1.0102, latt: 2.234234},
//     publicIP: '192.168.1.1',
//   };
// };

export const signup = (user) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${BASE_URL}/API/auth/signup`, {user})
      .then((res) => {
        if (res.data.success) {
          //   setCurrentUser(res.data.user);
          resolve(res.data);
        } else {
          reject(res.data.error.message);
        }
      })
      .catch((err) => {
        console.log('Network Error');
        console.log(err);
        reject('Network Error');
      });
  });
};

export const login = (user) => {
  return new Promise((resolve, reject) => {
    console.log('TEST 01, loging...');
    Axios.post(`${BASE_URL}/API/auth/login`, {user})
      .then((res) => {
        console.log('TEST 02, result');

        if (res.data.success) {
          console.log('TEST 03, pass logged in');

          setCurrentUser(res.data.user);
          console.log('TEST 04, user added, updating info');

          resolve(res.data);
        } else {
          reject(res.data.error.message);
        }
      })
      .catch((err) => {
        console.log('Network Error');
        console.log(err);
        reject('Network Error');
      });
  });
};

export const updateUserInfo = (mUser = null) => {
  return new Promise((resolve, reject) => {
    let user = null;
    if (mUser === null) {
      user = store.getState().AuthReducer.currentUser;
    }
    if (!(user == null && mUser !== null)) {
      console.log(user);
      user = {...user, lastLoggedIn: Date.now()};
      // user.lastLoggedIn =;
      // resolve(true);
      MyDeviceInfoController.loadInfo((deviceInfo) => {
        console.log('Device Info');
        console.log(deviceInfo);
        console.log(user);
        user = {...user, info: deviceInfo};
        user.info = deviceInfo;
        Axios.post(`${BASE_URL}/API/auth/update-user`, {user})
          .then((res) => {
            console.log('Info Updated');
            console.log(res.data);
            if (res.data.success) {
              setCurrentUser(res.data.user);
              resolve(res.data);
            } else {
              reject(res.data.error.message);
            }
          })
          .catch((err) => {
            console.log('Network Error');
            console.log(err);
            reject('Network Error');
          });
      });
      // resolve(true);
    } else {
      Axios.post(`${BASE_URL}/API/auth/update-user`, {user: mUser})
        .then((res) => {
          console.log('Info Updated');
          console.log(res.data);
          if (res.data.success) {
            setCurrentUser(res.data.user);
            resolve(res.data);
          } else {
            reject(res.data.error.message);
          }
        })
        .catch((err) => {
          console.log('Network Error');
          console.log(err);
          reject('Network Error');
        });
    }
  });
};

export const logout = () => {
  console.log('Loggin out');
  store.dispatch({
    type: LOGOUT,
  });
};
