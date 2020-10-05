import {combineReducers} from 'redux';
import AuthReducer from './authReducer';
const rootReducer = combineReducers({
  AuthReducer: AuthReducer,
});

export default rootReducer;
