import {
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL
} from '../actions/types';

const initialState = {
  message: null,
  loading: true
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        message: payload,
        loading: false
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        message: null,
        loading: false
      };
    default:
      return state;
  }
}
