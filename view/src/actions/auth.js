import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_PROFILE,
  LOGOUT,
  LOGIN_REQUIRED
} from './types';
import { setAlert } from './alert';

import axios from 'axios';

export const register = (
  username,
  email,
  password,
  history
) => async dispatch => {
  const body = JSON.stringify({
    username,
    email,
    password
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await axios.post(
      'https://3qllt.sse.codesandbox.io/api/auth/register',
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Registration was successful', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = [];
    errors.push(error.response.data.error);
    if (errors) {
      errors.map(error => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.error
    });
  }
};
export const login = (email, password, history) => async dispatch => {
  const body = JSON.stringify({
    email,
    password
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  try {
    const response = await axios.post(
      'https://3qllt.sse.codesandbox.io/api/auth/login',
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Login was successful', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = [];
    errors.push(error.response.data.error);
    if (errors) {
      errors.map(error => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.error
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

export const goToLogin = () => dispatch => {
  dispatch({
    type: LOGIN_REQUIRED
  });
  dispatch(setAlert('You need to be logged in to do that', 'danger'));
};
