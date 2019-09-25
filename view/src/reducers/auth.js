import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        user: {
          id: payload._id,
          username: payload.username,
          email: payload.email
        }
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated:false,
        loading: false,
        token: null,
        user:null
      }
    case LOGIN_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          isAuthenticated:false,
          loading: false,
          token: null,
          user:null
        }
    case AUTH_FAIL:
    case LOGOUT:
    case CLEAR_PROFILE:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null
      };

    default:
      return state;
  }
}
