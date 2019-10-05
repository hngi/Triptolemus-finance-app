import {
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_SUCCESS,
  LOADING_CONTACT
} from './types';
import { setAlert } from './alert';

import axios from 'axios';
const base_url = 'https://finance-tracker-server.herokuapp.com';
// const base_url = 'http://localhost:3500';

export const contact = (
  fullname,
  email,
  message,
  history
) => async dispatch => {
  dispatch({
    type: LOADING_CONTACT
  });
  const body = JSON.stringify({
    fullname,
    email,
    message
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await axios.post(base_url + '/contact', body, config);
    if (response.data.success) {
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: response.data
      });
      dispatch(
        setAlert(
          'Thanks for contacting us,we will get back to you shortly',
          'success'
        )
      );
      history.push('/');
    } else {
      dispatch(setAlert(response.data.message, 'danger'));
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: response.data.message
      });
    }
  } catch (error) {
    dispatch(setAlert(error.toString(), 'danger'));
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.toString()
    });
  }
};
