import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_PROFILE,
  LOGOUT
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
    // const errors = error.response.data.errors;
    // if (errors) {
    //   errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    // }
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
