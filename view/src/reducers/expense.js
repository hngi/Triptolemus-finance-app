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
      return {
        ...state,
        weeklyExpense: payload,
        monthlyExpense: state.monthlyExpense,
        yearlyExpense: state.yearlyExpense
      };
    case FETCH_WEEKLY_EXPENSE_FAIL:
      return {
        ...state,
        weeklyExpense: state.weeklyExpense,
        monthlyExpense: state.monthlyExpense,
        yearlyExpense: state.yearlyExpense
      };
    case FETCH_MONTHLY_EXPENSE_SUCCESS:
      return {
        ...state,
        weeklyExpense: state.weeklyExpense,
        monthlyExpense: payload,
        yearlyExpense: state.yearlyExpense
      };
    case FETCH_MONTHLY_EXPENSE_FAIL:
      return {
        ...state,
        weeklyExpense: state.weeklyExpense,
        monthlyExpense: state.monthlyExpense,
        yearlyExpense: state.yearlyExpense
      };
    case FETCH_YEARLY_EXPENSE_SUCCESS:
      return {
        ...state,
        weeklyExpense: state.weeklyExpense,
        monthlyExpense: state.monthlyExpense,
        yearlyExpense: payload
      };
    case FETCH_YEARLY_EXPENSE_FAIL:
      return {
        ...state,
        weeklyExpense: state.weeklyExpense,
        monthlyExpense: state.monthlyExpense,
        yearlyExpense: state.yearlyExpense
      };
    default:
      return state;
  }
}
