import {
  FETCH_WEEKLY_EXPENSE_FAIL,
  FETCH_MONTHLY_EXPENSE_SUCCESS,
  FETCH_WEEKLY_EXPENSE_SUCCESS,
  FETCH_YEARLY_EXPENSE_SUCCESS,
  FETCH_MONTHLY_EXPENSE_FAIL,
  FETCH_YEARLY_EXPENSE_FAIL
} from './types';
import axios from 'axios';
import moment from 'moment';

const base_url = 'https://finance-tracker-server.herokuapp.com';
// const base_url = 'http://localhost:3500';

export const getWeeklyExpense = userId => async dispatch => {
  const startOfWeek = moment().startOf('week');
  const endOfWeek = moment().endOf('week');
  const body = JSON.stringify({
    startDate: startOfWeek,
    endDate: endOfWeek
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await axios.post(
      base_url + `/api/users/${userId}/calculate/week`,
      body,
      config
    );
    if (response.data.success) {
      dispatch({
        type: FETCH_WEEKLY_EXPENSE_SUCCESS,
        payload: response.data.total_weekly_cost
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_WEEKLY_EXPENSE_FAIL,
      payload: error.toString()
    });
  }
};
export const getMonthlyExpense = userId => async dispatch => {
  const startOfMonth = moment().startOf('month');
  const endOfMonth = moment().endOf('month');
  const body = JSON.stringify({
    startDate: startOfMonth,
    endDate: endOfMonth
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await axios.post(
      base_url + `/api/users/${userId}/calculate/month`,
      body,
      config
    );
    if (response.data.success) {
      dispatch({
        type: FETCH_MONTHLY_EXPENSE_SUCCESS,
        payload: response.data.items[0].total
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_MONTHLY_EXPENSE_FAIL,
      payload: error.toString()
    });
  }
};
export const getYearlyExpense = userId => async dispatch => {
  const startOfYear = moment().startOf('year');
  const endOfYear = moment().endOf('year');
  const body = JSON.stringify({
    startDate: startOfYear,
    endDate: endOfYear
  });
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await axios.post(
      base_url + `/api/users/${userId}/calculate/year`,
      body,
      config
    );
    if (response.data.success) {
      dispatch({
        type: FETCH_YEARLY_EXPENSE_SUCCESS,
        payload: response.data.totalExpenses
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_YEARLY_EXPENSE_FAIL,
      payload: error.toString()
    });
  }
};

export const getExpenseReport = (innerHTML, userId) => async dispatch => {
  try {
    const body = JSON.stringify({
      innerHTML
    });

    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const response = await axios.post(
      base_url + `/api/users/${userId}/expense/report`,
      body,
      config
    );
    console.log(response.data);

    if (response.data.success) {
      console.log('successful');
      let win = window.open(
        base_url +
          `/api/users/${userId}/expense/report/${response.data.fileName}`,
        '_blank'
      );
      win.focus();
    } else {
      console.log('was not successful');
    }
  } catch (error) {
    console.log('was not successful');
  }
};
