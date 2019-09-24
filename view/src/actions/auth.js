import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_PROFILE,
  LOGOUT
} from './types';
import { setAlert } from './alert';
// import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

// export const loadUser = () => async dispatch => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
//   try {
//     const response = await axios.get('/user');
//     dispatch({
//       type: LOAD_USER,
//       payload: response.data
//     });
//   } catch (error) {
//     dispatch({
//       type: AUTH_FAIL
//     });
//   }
// };
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
    const response = await axios.post('http://localhost:3500/api/auth/register', body, config);
    console.log(response);
    if(response.data !== null){
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });
      dispatch(setAlert('Registration was successful', 'success'));
      history.push('/dashboard');
      }
      dispatch(setAlert('Invalid credentials'))
  } catch (error) {
    // console.log(error)
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
    const response = await axios.post(
      'http://localhost:3500/api/auth/login',
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
