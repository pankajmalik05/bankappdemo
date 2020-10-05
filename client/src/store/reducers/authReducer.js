import {SET_CURRENT_USER, LOGOUT} from '../actions/types';

const state = {
  currentUser: null,
};

const AuthReducer = (mState = {...state}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      mState.currentUser = action.payload;
      return {...mState};
    case LOGOUT:
      mState.currentUser = null;
      return {...mState};
    default:
      return {...mState};
  }
};

export default AuthReducer;
