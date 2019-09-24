import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOAD_USER,
  AUTH_FAIL,
  CLEAR_PROFILE,
  LOGOUT
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const response = await axios.get('/user');
    dispatch({
      type: LOAD_USER,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL
    });
  }
};
export const register = (
  name,
  email,
  password,
  password2,
  history
) => async dispatch => {
  const body = JSON.stringify({
    name,
    email,
    password,
    password2
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await axios.post('/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Registration was successful', 'success'));
    history.push('/dashboard');
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
      payload: error
    });
  }
};
export const login = (email, password, history) => async dispatch => {
  const body = JSON.stringify({
    email,
    password
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await axios.post('/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Login was successful', 'success'));
    history.push('/dashboard');
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOGOUT
  });
  dispatch(setAlert('Logout was successful', 'success'));
};
