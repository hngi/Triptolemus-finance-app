import {
  SET_MONTHLY_BUDGET_SUCCESS,
  SET_MONTHLY_BUDGET_FAIL,
  SET_WEEKLY_BUDGET_SUCCESS,
  SET_WEEKLY_BUDGET_FAIL,
  SET_YEARLY_BUDGET_SUCCESS,
  SET_YEARLY_BUDGET_FAIL
  // MODIFY_BUDGET_SUCCESS,
  // MODIFY_BUDGET_FAIL
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
const base_url = 'https://finance-tracker-server.herokuapp.com';
// const base_url = 'http://localhost:3500';

export const setWeeklyBudget = (
  duration,
  amount,
  userIdd
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    duration,
    amount
  });
  try {
    const response = await axios.post(
      base_url + `/api/users/${userIdd}/setWeeklyBudget`,
      body,
      config
    );
    console.log(response);
    dispatch({
      type: SET_WEEKLY_BUDGET_SUCCESS,
      payload: response.data
    });
    // history.push('/dashboard');
    // dispatch(setAlert('Items were fetched successfully', 'success'));
  } catch (error) {
    dispatch({
      type: SET_WEEKLY_BUDGET_FAIL,
      payload: error.response.data.error
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
export const setMonthlyBudget = (
  duration,
  amount,
  userIdd
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    duration,
    amount
  });
  try {
    const response = await axios.post(
      base_url + `/api/users/${userIdd}/setMonthlyBudget`,
      body,
      config
    );
    // console.log(response);
    dispatch({
      type: SET_MONTHLY_BUDGET_SUCCESS,
      payload: response.data
    });
    // history.push('/dashboard');
    // dispatch(setAlert('Items were fetched successfully', 'success'));
  } catch (error) {
    dispatch({
      type: SET_MONTHLY_BUDGET_FAIL,
      payload: error.response.data.error
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
export const setYearlyBudget = (duration, amount, userId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    duration,
    amount
  });
  try {
    const response = await axios.post(
      base_url + `/api/users/${userId}/setYearlyBudget`,
      body,
      config
    );
    // console.log(response);
    dispatch({
      type: SET_YEARLY_BUDGET_SUCCESS,
      payload: response.data
    });
    // history.push('/dashboard');
    // dispatch(setAlert('Items were fetched successfully', 'success'));
  } catch (error) {
    dispatch({
      type: SET_YEARLY_BUDGET_FAIL,
      payload: error.response.data.error
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
