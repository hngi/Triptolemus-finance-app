import {
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL
} from '../actions/types';

const initialState = {
  item: null,
  items: [],
  loading: true
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        item: payload,
        loading: false
      };
    case ADD_ITEM_FAIL:
      return {
        ...state,
        item: null,
        loading: false
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case GET_ITEMS_FAIL:
      return {
        ...state,
        items:null,
        loading: false
      };
    
    default:
      return state;
  }
}
