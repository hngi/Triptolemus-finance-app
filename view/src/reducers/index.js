import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import item from './item'
import contact from './contact'
import expense from './expense'
const rootReducer = combineReducers({ auth,alert,item,contact,expense });

export default rootReducer;
