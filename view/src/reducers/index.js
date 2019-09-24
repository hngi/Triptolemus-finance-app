import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile'
const rootReducer = combineReducers({ auth,alert,profile });

export default rootReducer;
