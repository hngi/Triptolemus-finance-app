import {
  SET_MONTHLY_BUDGET_SUCCESS,
  SET_MONTHLY_BUDGET_FAIL,
  SET_WEEKLY_BUDGET_SUCCESS,
  SET_WEEKLY_BUDGET_FAIL,
  SET_YEARLY_BUDGET_SUCCESS,
  SET_YEARLY_BUDGET_FAIL

} from './types';
import { setAlert } from './alert';
import axios from 'axios';
const base_url = 'https://finance-tracker-server.herokuapp.com';
// const base_url = 'http://localhost:3500';

export const setWeeklyBudget = (duration, budget, userId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    duration,
    budget
  });
  try {
    const response = await axios.post(
      base_url + `/api/users/${userId}/setWeeklyBudget`,
      body,
      config
    );
    if (response.data.success) {
      dispatch({
        type: SET_WEEKLY_BUDGET_SUCCESS,
        payload: response.data
      });
      dispatch(setAlert('Weekly Budget Set', 'success'));
    } else {
      dispatch(setAlert(response.data.message, 'danger'));
    }
  } catch (error) {
    dispatch(setAlert(error.toString(), 'danger'));

    dispatch({
      type: SET_WEEKLY_BUDGET_FAIL,
      payload: error.toString()
    });
  }
};
export const setMonthlyBudget = (
  duration,
  budget,
  userId
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    duration,
    budget
  });
  try {
    const response = await axios.post(
      base_url + `/api/users/${userId}/setMonthlyBudget`,
      body,
      config
    );
    if (response.data.success) {
      dispatch({
        type: SET_MONTHLY_BUDGET_SUCCESS,
        payload: response.data
      });
      dispatch(setAlert('Monthly Budget Set', 'success'));
    } else {
      dispatch(setAlert(response.data.message, 'danger'));
    }
  } catch (error) {
    dispatch({
      type: SET_MONTHLY_BUDGET_FAIL,
      payload: error.toString()
    });
    dispatch(setAlert(error.toString(), 'danger'));
  }
};
export const setYearlyBudget = (duration, budget, userId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    duration,
    budget
  });
  try {
    const response = await axios.post(
      base_url + `/api/users/${userId}/setYearlyBudget`,
      body,
      config
      );
    if (response.data.success) {
      dispatch({
        type: SET_YEARLY_BUDGET_SUCCESS,
        payload: response.data
      });
      dispatch(setAlert('Weekly Budget Set', 'success'));
    } else {
      dispatch(setAlert(response.data.message, 'danger'));
    }
  } catch (error) {
    dispatch(setAlert(error.toString(), 'danger'));

    dispatch({
      type: SET_YEARLY_BUDGET_FAIL,
      payload: error.toString()
    });
  }
};
