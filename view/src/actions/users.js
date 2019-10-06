import {
    LOADING,
    EDIT_PROFILE,
    CLEAR_PROFILE
  } from './types';
  import { setAlert } from './alert';
  
  import axios from 'axios';
  const base_url = 'http://localhost:3500/api/users/edit';

  export const userProfileDetails = (first_name, last_name, email, phone_number, gender, date_of_birth, userId) => async dispatch => {
    dispatch({
      type: LOADING
    });
    const body = JSON.stringify({
      first_name,
      last_name, 
      email,
      phone_number,
      gender,
      date_of_birth, userId
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    try {
      const response = await axios.put(
        base_url + '/api/users/edit',
        body,
        config
      );
      if (response.data.success) {
        dispatch({
          type: EDIT_PROFILE,
          payload: response.data
        });
        // dispatch(setAlert('Profile update successful', 'success'));
        // history.push('window.userProfile');
      }
    } catch (error) {
      dispatch(setAlert(error.toString(), 'danger'));
  
      dispatch({
        type: CLEAR_PROFILE,
        payload: error.toString()
      });
    }
  };
  