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
  budget,
  userIdd
) => async dispatch => {
  console.log("weekly is running")
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
      base_url + `/api/users/${userIdd}/setWeeklyBudget`,
      body,
      config
    );
   
    dispatch({
      type: SET_WEEKLY_BUDGET_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Weekly Budget Set', 'success')); 
    console.log(response);
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_WEEKLY_BUDGET_FAIL,
      payload: error.response.data.error
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
export const setMonthlyBudget = (
  duration,
  budget,
  userIdd
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
    dispatch(setAlert('Monthly Budget Set', 'success'));
    console.log(response);
  } catch (error) {
    dispatch({
      type: SET_MONTHLY_BUDGET_FAIL,
      payload: error.response.data.error
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
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
    // console.log(response);
    dispatch({
      type: SET_YEARLY_BUDGET_SUCCESS,
      payload: response.data
    });
    // history.push('/dashboard');
    dispatch(setAlert('Weekly Budget Set', 'success'));
    console.log(response);
  } catch (error) {
    dispatch({
      type: SET_YEARLY_BUDGET_FAIL,
      payload: error.response.data.error
    });
    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};
