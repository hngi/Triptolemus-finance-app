import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import item from './item'
import contact from './contact'
import expense from './expense'
import budget from './budget'
const rootReducer = combineReducers({ auth,alert,item,contact,expense,budget });

export default rootReducer;
