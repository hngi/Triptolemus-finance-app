import {
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
  RESET_PASSWORD_SUCCESS
} from './types';
import { setAlert } from './alert';

import axios from 'axios';
const base_url = 'http://127.0.0.1:3500';
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
      base_url + '/api/auth/register',
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
      base_url + '/api/auth/login', //finance-tracker-server.herokuapp.com
      body,
      config
    );
    console.log(response)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Login was successful', 'success'));
    history.push('/dashboard');
  } catch (error) {
    if (error.hasOwnProperty('response')){
     dispatch(setAlert(error.response.data.error, 'danger'))
     
    } else{
      dispatch(setAlert('server error', 'danger'))
      
    }
    dispatch({
        type: LOGIN_FAIL,
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

export const goToLogin = () => dispatch => {
  dispatch({
    type: LOGIN_REQUIRED
  });
  dispatch(setAlert('You need to be logged in to do that', 'danger'));
};

export const requestResetPassword = email => async dispatch => {
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
    if (response.data.success){
      console.log("Successful")
      dispatch(setAlert(response.data.message.toString(), 'success'));
      dispatch({
      type: REQUEST_PASSWORD_RESET_SUCCESS,
      payload: response.data
    });
    } else {
      dispatch(setAlert(response.data.message.toString(), 'danger'));
    dispatch({
      type: REQUEST_PASSWORD_RESET_FAIL,
      payload: response.data.message
    });
    }
    
  } catch (error) {
    console.log(error.response)
    dispatch(setAlert("Error", 'danger'));
      dispatch({
      type: REQUEST_PASSWORD_RESET_FAIL,
      payload: error.response
    });
  }
};

export const resetPassword = (token, password, history) => async dispatch => {
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

    if (response.data.success){
      dispatch(setAlert(response.data.message.toString(), 'success'));
      dispatch({
      type: REQUEST_PASSWORD_RESET_SUCCESS,
      payload: response.data
    });
    } else {
      dispatch(setAlert(response.data.message.toString(), 'danger'));
    dispatch({
      type: REQUEST_PASSWORD_RESET_FAIL,
      payload: response.data.message
    });
    }
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log(error.response)
    if (error.hasOwnProperty('response')){
      dispatch(setAlert(error.response.data.error, 'danger'))
     } else{
       dispatch(setAlert('server error', 'danger'))
       
     }
     dispatch({
         type: LOGIN_FAIL,
         payload: error.response
       });
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data
    });
  }
};
