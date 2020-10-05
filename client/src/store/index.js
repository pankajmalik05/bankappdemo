import {createStore, applyMiddleware, compose} from 'redux';
import rootRedcuer from './reducers';
import thunk from 'redux-thunk';

const initialState = {};
const middleWare = [thunk];

const store = createStore(
  rootRedcuer,
  initialState,
  compose(applyMiddleware(...middleWare)),
);
export default store;
