import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_REQUIRED,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL
  // REQUEST_PASSWORD_RESET_FAIL,
  // REQUEST_PASSWORD_RESET_SUCCESS,
  // RESET_PASSWORD_FAIL,
  // RESET_PASSWORD_SUCCESS
} from '../actions/types';


const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  profile:{}
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
    case LOGIN_REQUIRED:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
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
