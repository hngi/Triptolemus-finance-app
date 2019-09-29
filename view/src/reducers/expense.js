import {
  FETCH_WEEKLY_EXPENSE_SUCCESS,
  FETCH_WEEKLY_EXPENSE_FAIL,
  FETCH_MONTHLY_EXPENSE_SUCCESS,
  FETCH_MONTHLY_EXPENSE_FAIL,
  FETCH_YEARLY_EXPENSE_SUCCESS,
  FETCH_YEARLY_EXPENSE_FAIL
} from '../actions/types';

const initialState = {
  weeklyExpense: 0,
  monthlyExpense: 0,
  yearlyExpense: 0
};
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_WEEKLY_EXPENSE_SUCCESS:
      console.log(payload);
      return {
        ...state,
        weeklyExpense: payload
      };
    case FETCH_WEEKLY_EXPENSE_FAIL:
      return {
        ...state,
        weeklyExpense: 0
      };
    case FETCH_MONTHLY_EXPENSE_SUCCESS:
      return {
        ...state,
        monthlyExpense: payload
      };
    case FETCH_MONTHLY_EXPENSE_FAIL:
      return {
        ...state,
        monthlyExpense: 0
      };
    case FETCH_YEARLY_EXPENSE_SUCCESS:
      return {
        ...state,
        yearlyExpense: payload
      };
    case FETCH_YEARLY_EXPENSE_FAIL:
      return {
        ...state,
        yearlyExpense: 0
      };
    default:
      return state;
  }
}
