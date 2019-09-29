import {
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL
} from './types';
import { setAlert } from './alert';
import { loadData } from './auth';
import axios from 'axios';
// const base_url = 'https://finance-tracker-server.herokuapp.com';;
const base_url = 'http://localhost:3500';
export const getItems = (
  startDate,
  endDate,
  userId,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({
      startDate,
      endDate
    });
    const response = await axios.post(
      base_url + `/api/users/${userId}/allItems`,
      body,
      config
    );
    if (response.data.success) {
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: response.data
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ITEMS_FAIL,
      payload: error.toString()
    });
  }
};

export const addItem = (
  name,
  description,
  amount,
  date,
  userId,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    name,
    description,
    amount,
    date
  });
  try {
    const response = await axios.post(
      base_url + `/api/users/${userId}/items`,
      body,
      config
    );
    if (response.data.success) {
      dispatch({
        type: ADD_ITEM_SUCCESS,
        payload: response.data
      });
      dispatch(setAlert('A new Item was added successfully', 'success'));
      loadData(dispatch, userId);
    } else {
      dispatch(setAlert(response.data.message, 'danger'));
    }
  } catch (error) {
    dispatch(setAlert(error.toString(), 'danger'));

    dispatch({
      type: ADD_ITEM_FAIL,
      payload: error.toString()
    });
  }
};
