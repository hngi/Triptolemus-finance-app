<<<<<<< HEAD
import {
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAIL,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  FETCH_CURRENT_PROFILE_SUCCESS,
  FETCH_CURRENT_PROFILE_FAIL,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  CLEAR_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case FETCH_PROFILES_FAIL:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case FETCH_PROFILE_SUCCESS:
    case FETCH_CURRENT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case FETCH_PROFILE_FAIL:
    case FETCH_CURRENT_PROFILE_FAIL:
      return {
        ...state,
        loading: false
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        loading: false
      };
    case ADD_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload
      };
    case ADD_EDUCATION_FAIL:
      return {
        ...state,
        loading: false
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload
      };
    case ADD_EXPERIENCE_FAIL:
      return {
        ...state,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };

    default:
      return state;
  }
}
=======
import {
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAIL,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  FETCH_CURRENT_PROFILE_SUCCESS,
  FETCH_CURRENT_PROFILE_FAIL,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  CLEAR_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case FETCH_PROFILES_FAIL:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case FETCH_PROFILE_SUCCESS:
    case FETCH_CURRENT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case FETCH_PROFILE_FAIL:
    case FETCH_CURRENT_PROFILE_FAIL:
      return {
        ...state,
        loading: false
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        loading: false
      };
    case ADD_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload
      };
    case ADD_EDUCATION_FAIL:
      return {
        ...state,
        loading: false
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload
      };
    case ADD_EXPERIENCE_FAIL:
      return {
        ...state,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };

    default:
      return state;
  }
}
>>>>>>> develop
