import {
  FETCH_WEEKLY_EXPENSE_SUCCESS,
  FETCH_WEEKLY_EXPENSE_FAIL,
  FETCH_MONTHLY_EXPENSE_SUCCESS,
  FETCH_MONTHLY_EXPENSE_FAIL,
  FETCH_YEARLY_EXPENSE_SUCCESS,
  FETCH_YEARLY_EXPENSE_FAIL
  
} from './types';
// import { setAlert } from './alert';
import axios from 'axios';
const base_url = 'https://finance-tracker-server.herokuapp.com';

export const getWeeklyExpense = (userId) => async dispatch => {
  try {
    const response = await axios.post(base_url + `/api/users/${userId}/calculate/week`);
    console.log(response);
    dispatch({
      type: FETCH_WEEKLY_EXPENSE_SUCCESS,
      payload: response.data
    });
    // history.push('/dashboard');
    // dispatch(setAlert('Items were fetched successfully', 'success'));
  } catch (error) {
    dispatch({
      type: FETCH_WEEKLY_EXPENSE_FAIL,
      payload: error
    });
    // dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
export const getMonthlyExpense = (userId) => async dispatch => {
  try {
    const response = await axios.post(base_url + `/api/users/${userId}/calculate/month`);
    console.log(response);
    dispatch({
      type: FETCH_MONTHLY_EXPENSE_SUCCESS,
      payload: response.data
    });
    // history.push('/dashboard');
    // dispatch(setAlert('Items were fetched successfully', 'success'));
  } catch (error) {
    dispatch({
      type: FETCH_MONTHLY_EXPENSE_FAIL,
      payload: error
    });
    // dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
export const getYearlyExpense = (userId) => async dispatch => {
  try {
    const response = await axios.post(base_url + `/api/users/${userId}/calculate/year`);
    console.log(response);
    dispatch({
      type: FETCH_YEARLY_EXPENSE_SUCCESS,
      payload: response.data
    });
    // history.push('/dashboard');
    // dispatch(setAlert('Items were fetched successfully', 'success'));
  } catch (error) {
    dispatch({
      type: FETCH_YEARLY_EXPENSE_FAIL,
      payload: error
    });
    // dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
