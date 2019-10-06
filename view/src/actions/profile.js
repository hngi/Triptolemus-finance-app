import { LOADING, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL } from './types';
import { setAlert } from './alert';
import { fetchProfile } from './auth';
import axios from 'axios';
// const base_url = 'http://localhost:3500';
const base_url = 'https://finance-tracker-server.herokuapp.com';

export const updateProfile = (
  first_name,
  last_name,
  phone_number,
  gender,
  date_of_birth,
  userId
) => async dispatch => {
  dispatch({
    type: LOADING
  });
  const body = JSON.stringify({
    first_name,
    last_name,
    phone_number,
    gender,
    date_of_birth
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  try {
    const response = await axios.put(
      base_url + `/api/users/${userId}/profile`,
      body,
      config
    );
    console.log(response);
    if (response.data.success) {
      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: response.data.profile
      });
      dispatch(setAlert('Profile update successful', 'success'));
      dispatch(fetchProfile(userId));
    } else {
      dispatch({
        type: EDIT_PROFILE_FAIL,
        payload: response.data
      });
      dispatch(setAlert(response.data.message.toString(), 'danger'));
    }
  } catch (error) {
    dispatch(setAlert(error.toString(), 'danger'));

    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: error.toString()
    });
  }
};
