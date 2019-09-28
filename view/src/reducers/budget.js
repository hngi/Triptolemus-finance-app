import {
  SET_MONTHLY_BUDGET_SUCCESS,
  SET_MONTHLY_BUDGET_FAIL,
  SET_WEEKLY_BUDGET_SUCCESS,
  SET_WEEKLY_BUDGET_FAIL,
  SET_YEARLY_BUDGET_SUCCESS,
  SET_YEARLY_BUDGET_FAIL
  // MODIFY_BUDGET_SUCCESS,
  // MODIFY_BUDGET_FAIL
} from '../actions/types';

const initialState = {
  weeklyBudget: 0,
  monthlyBudget: 0,
  yearlyBudget: 0
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_WEEKLY_BUDGET_SUCCESS:
      return {
        ...state,
        weeklyBudget: payload.user
      };
    case SET_WEEKLY_BUDGET_FAIL:
      return {
        ...state,
        weeklyBudget: 0
      };
    case SET_MONTHLY_BUDGET_SUCCESS:
      return {
        ...state,
        monthlyBudget: payload.user
      };
    case SET_MONTHLY_BUDGET_FAIL:
      return {
        ...state,
        monthlyBudget: 0
      };
    case SET_YEARLY_BUDGET_SUCCESS:
      return {
        ...state,
        yearlyBudget: payload.user
      };
    case SET_YEARLY_BUDGET_FAIL:
      return {
        ...state,
        yearlyBudget: 0
      };
    default:
      return state;
  }
}
