import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import item from './item'
const rootReducer = combineReducers({ auth,alert,item });

export default rootReducer;
