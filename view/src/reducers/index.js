import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import item from './item'
import contact from './contact'
const rootReducer = combineReducers({ auth,alert,item,contact });

export default rootReducer;
