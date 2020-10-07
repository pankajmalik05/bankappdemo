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

export const signup = (user) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${BASE_URL}/API/auth/signup`, {user})
      .then((res) => {
        if (res.data.success) {
          resolve(res.data);
        } else {
          reject(res.data.error.message);
        }
      })
      .catch((err) => {
        reject('Network Error');
      });
  });
};

export const login = (user) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${BASE_URL}/API/auth/login`, {user})
      .then((res) => {
        if (res.data.success) {
          setCurrentUser(res.data.user);
          resolve(res.data);
        } else {
          reject(res.data.error.message);
        }
      })
      .catch((err) => {
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
      user = {...user, lastLoggedIn: Date.now()};
      MyDeviceInfoController.loadInfo((deviceInfo) => {
        user = {...user, info: deviceInfo};
        user.info = deviceInfo;
        Axios.post(`${BASE_URL}/API/auth/update-user`, {user})
          .then((res) => {
            if (res.data.success) {
              setCurrentUser(res.data.user);
              resolve(res.data);
            } else {
              reject(res.data.error.message);
            }
          })
          .catch((err) => {
            reject('Network Error');
          });
      });
    } else {
      Axios.post(`${BASE_URL}/API/auth/update-user`, {user: mUser})
        .then((res) => {
          if (res.data.success) {
            setCurrentUser(res.data.user);
            resolve(res.data);
          } else {
            reject(res.data.error.message);
          }
        })
        .catch((err) => {
          reject('Network Error');
        });
    }
  });
};

export const logout = () => {
  store.dispatch({
    type: LOGOUT,
  });
};
