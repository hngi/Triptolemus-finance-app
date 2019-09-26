import {
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getItems = (userId,history) => async dispatch => {
  try {
    const response = await axios.get(
      `https://finance-tracker-server.herokuapp.com/api/users/${userId}/items`
    );
    console.log(response)
    dispatch({
      type: GET_ITEMS_SUCCESS,
      payload: response.data
    });
    history.push('/dashboard');
    dispatch(setAlert('Items were fetched successfully', 'success'));
  } catch (error) {
    
    dispatch({
      type: GET_ITEMS_FAIL,
      payload: error.response.data.error
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};

export const addItem = (userId,
  name,description,amount,
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
    amount
  });
  try {
    const response = await axios.post(
      `https://finance-tracker-server.herokuapp.com/api/users/${userId}/items`,
      body,
      config
    );
    console.log(response);
    dispatch({
      type: ADD_ITEM_SUCCESS,
      payload: response.data
    });
    history.push('/dashboard');
    dispatch(setAlert('A new Item was added successfully', 'success'));

  } catch (error) {
    dispatch({
      type: ADD_ITEM_FAIL,
      payload: error.response.data.error
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
