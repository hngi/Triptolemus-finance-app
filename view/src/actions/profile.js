import {
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAIL,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  FETCH_CURRENT_PROFILE_SUCCESS,
  FETCH_CURRENT_PROFILE_FAIL,
  DELETE_ACCOUNT,CLEAR_PROFILE,
  EDIT_PROFILE_SUCCESS
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getCurrentProfile = () => async dispatch => {
  try {
    const response = await axios.get('/profile/me');
    dispatch({
      type: FETCH_CURRENT_PROFILE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: FETCH_CURRENT_PROFILE_FAIL,
      payload: error
    });
  }
};
export const fetchProfiles = () => async dispatch => {
  try {
    const response = await axios.get('/profile');
    dispatch({
      type: FETCH_PROFILES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: FETCH_PROFILES_FAIL,
      payload: error
    });
  }
};
export const createProfile = (
  avatar,company,
  website,
  location,
  status,
  skills,
  githubusername,
  bio,
  twitter,
  facebook,
  linkedin,
  github,
  youtube,
  instagram,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    avatar,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    github,
    youtube,
    instagram
  });
  try {
    const response = await axios.post(`/profile`, body, config);
    dispatch({
      type: CREATE_PROFILE_SUCCESS,
      payload: response.data
    });
    history.push('/dashboard');
    dispatch(setAlert('Profile creation/update was successful', 'success'));

  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: error
    });
  }
};
export const deleteAccount=(history)=>async dispatch=>{
  if (window.confirm("Are you sure? This CANNOT be undone!")) {
  try {
    const response=await axios.delete('/profile')
    dispatch({
      type: DELETE_ACCOUNT
    });
    dispatch({
      type: CLEAR_PROFILE
    });
    dispatch(setAlert('User successfully deleted', 'success'));
    history.push('/login')
  } catch (error) {dispatch(setAlert(error.message, 'danger'))
    
  }
  }
}
export const fetchProfile = user_id => async dispatch => {
  try {
    const response = await axios.get(`/profile/${user_id}`);
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: FETCH_PROFILE_FAIL,
      payload: error
    });
  }
};
export const addExperience = (
  company,
  title,
  location,
  from,
  to,
  current,
  description,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    company,
    title,
    location,
    from,
    to,
    current,
    description
  });
  try {
    const response = await axios.post(`/profile/experience`, body, config);
    dispatch({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Experience was added successfully', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ADD_EXPERIENCE_FAIL,
      payload: error
    });
  }
};
export const deleteExperience = (exp_id) => async dispatch => {
  try {
    const response = await axios.delete(`/profile/experience/${exp_id}`);
    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Experience successfully removed', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const addEducation = (
  school,
  degree,
  fieldofstudy,
  from,
  to,
  current,
  description,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  });
  try {
    const response = await axios.post(`/profile/education`, body, config);
    dispatch({
      type: ADD_EDUCATION_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Education was added successfully', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ADD_EDUCATION_FAIL,
      payload: error
    });
  }
};

export const deleteEducation = (edu_id) => async dispatch => {
  try {
    const response = await axios.delete(`/profile/education/${edu_id}`);
    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: response.data
    });
    dispatch(setAlert('Education successfully removed', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
