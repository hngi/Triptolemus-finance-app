import {
  LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_PROFILE,
  LOGOUT,
  LOGIN_REQUIRED,
  REQUEST_PASSWORD_RESET_SUCCESS,
  REQUEST_PASSWORD_RESET_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL
} from './types';
import { setAlert } from './alert';

import axios from 'axios';
const base_url = 'https://finance-tracker-server.herokuapp.com';
// const base_url = 'http://localhost:3500';

export const register = (
  username,
  email,
  password,
  history
) => async dispatch => {
  dispatch({
    type: LOADING
  });

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
      base_url + '/api/auth/register',
      body,
      config
    );
    if (response.data.success) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });
      dispatch(setAlert('Registration was successful', 'success'));
      history.push('/');
    } else {
      dispatch(setAlert(response.data.message, 'danger'));
    }
  } catch (error) {
    dispatch(setAlert(error.toString(), 'danger'));

    dispatch({
      type: REGISTER_FAIL,
      payload: error.toString()
    });
  }
};
export const login = (email, password, history) => async dispatch => {
  dispatch({
    type: LOADING
  });
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
      base_url + '/api/auth/login',
      body,
      config
    );
    if (response.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
      dispatch(setAlert('Login was successful', 'success'));
      history.push('/dashboard');
    } else {
      dispatch(setAlert(response.data.message, 'danger'));
    }
  } catch (error) {
    dispatch(setAlert(error.toString(), 'danger'));

    dispatch({
      type: LOGIN_FAIL,
      payload: error.toString()
    });
  }
};
export const fetchProfile = userId => async dispatch => {
  try {
    const response = await axios.get(base_url + `/api/users/${userId}/profile`);
    if (response.data.success) {
      dispatch({
        type: FETCH_PROFILE_SUCCESS,
        payload: response.data.user[0]
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_PROFILE_FAIL,
      payload: error.response
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

export const showLoginAlert = (message, alertType) => async dispatch => {
  dispatch({
    type: LOGIN_REQUIRED
  });

  dispatch(setAlert(message, alertType));
};

export const requestResetPassword = (email, history) => async dispatch => {
  dispatch({
    type: LOADING
  });
  const body = JSON.stringify({
    email
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const response = await axios.post(
      base_url + '/api/auth/forgot',
      body,
      config
    );
    if (response.data.success) {
      dispatch(setAlert(response.data.message.toString(), 'success'));
      dispatch({
        type: REQUEST_PASSWORD_RESET_SUCCESS,
        payload: response.data
      });
      history.push({ pathname: '/check-email', state: { email: email } });
    } else {
      dispatch(setAlert(response.data.message.toString(), 'danger'));
      dispatch({
        type: REQUEST_PASSWORD_RESET_FAIL,
        payload: response.data.message
      });
    }
  } catch (error) {
    dispatch(setAlert('Error resetting password', 'danger'));
    dispatch({
      type: REQUEST_PASSWORD_RESET_FAIL,
      payload: error.response
    });
  }
};

export const resetPassword = (token, password, history) => async dispatch => {
  dispatch({
    type: LOADING
  });
  const body = JSON.stringify({
    token,
    password
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const response = await axios.post(
      base_url + '/api/auth/reset',
      body,
      config
    );

    if (response.data.success) {
      dispatch(setAlert(response.data.message.toString(), 'success'));
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: response.data
      });
      history.push('/login');
    } else {
      dispatch(setAlert(response.data.message.toString(), 'danger'));
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: response.data
      });
    }
  } catch (error) {
    if (error.hasOwnProperty('response')) {
      dispatch(setAlert(error.response.data.error, 'danger'));
    } else {
      dispatch(setAlert('Server error', 'danger'));
    }
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data
    });
  }
};

