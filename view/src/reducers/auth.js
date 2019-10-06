import {
  LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_REQUIRED,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  REQUEST_PASSWORD_RESET_FAIL,
  REQUEST_PASSWORD_RESET_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  SET_WEEKLY_BUDGET_SUCCESS,
  SET_MONTHLY_BUDGET_SUCCESS,
  SET_YEARLY_BUDGET_SUCCESS,
  SIGN_IN_GOOGLE
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  profile: {},
  expenses: {},
  isSignedInWithGoogle: false
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        user: {
          id: payload.user._id,
          username: payload.user.username,
          email: payload.user.email
        }
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        profile: payload
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        profile: {}
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        profile: {
          weekly_budget: state.profile.weekly_budget,
          monthly_budget: state.profile.monthly_budget,
          yearly_budget: state.profile.yearly_budget,
          firstname: payload.first_name,
          lastname: payload.last_name,
          phoneNumber: payload.phone_number,
          gender: payload.gender,
          dateOfBirth: payload.date_of_birth
        }
      };
    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        profile: {}
      };
    case SET_WEEKLY_BUDGET_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        profile: {
          weekly_budget: payload.weekly_budget,
          monthly_budget: state.profile.monthly_budget,
          yearly_budget: state.profile.yearly_budget
        }
      };
    case SET_MONTHLY_BUDGET_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        profile: {
          weekly_budget: state.profile.weekly_budget,
          monthly_budget: payload.user,
          yearly_budget: state.profile.yearly_budget
        }
      };
    case SET_YEARLY_BUDGET_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        profile: {
          weekly_budget: state.profile.weekly_budget,
          monthly_budget: state.profile.monthly_budget,
          yearly_budget: payload.user
        }
      };
    case LOGIN_REQUIRED:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null
      };

    case LOADING:
      return {
        ...state,
        loading: true
      };
    case REQUEST_PASSWORD_RESET_FAIL:
      return {
        ...state,
        loading: false
      };

    case REQUEST_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SIGN_IN_GOOGLE:
      return {
        ...state,
        loading: false,
        isSignedInWithGoogle: true
      };

    default:
      return state;
  }
}
