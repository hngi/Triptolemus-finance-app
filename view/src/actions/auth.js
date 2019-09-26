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
      'https://finance-tracker-server.herokuapp.com/api/auth/register',
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
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await axios.post(
      'https://finance-tracker-server.herokuapp.com/api/auth/login',
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
  dispatch(setAlert('You need to be logged in to do that','danger'));
}

export const requestResetPassword = (email,history) => async dispatch => {
  const body = JSON.stringify({
    email
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try{
    const response = await axios.post(
      'https://finance-tracker-server.herokuapp.com/api/auth/forgot',
      body,
      config
    );
    dispatch({
      type: REQUEST_PASSWORD_RESET_SUCCESS,
      payload: response.data
    });


  } catch(error){
    dispatch({
      type: REQUEST_PASSWORD_RESET_FAIL,
      payload: error.response.data
    });

  }

} 

export const resetPassword = (token,password,history) => async dispatch => {
  const body = JSON.stringify({
    token,
    password
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try{
    const response = await axios.post(
      'https://finance-tracker-server.herokuapp.com/api/auth/reset',
      body,
      config
    );
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: response.data
    });


  } catch(error){
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data
    });

  }

} 