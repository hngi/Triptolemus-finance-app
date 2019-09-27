import {
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_SUCCESS
} from './types';
import { setAlert } from './alert';

import axios from 'axios';

export const contact = (
  fullname,
  email,
  message,
  history
) => async dispatch => {
  const body = JSON.stringify({
    fullname,
    email,
    message
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await axios.post(
      'https://3qllt.sse.codesandbox.io/contact',
      body,
      config
    );

    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Thanks for contacting us,we will get back to you shortly', 'success'));
    history.push('/');
  } catch (error) {
    const errors = [];
    errors.push(error.response.data.error);
    if (errors) {
      errors.map(error => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.response.data.error
    });
  }
};
