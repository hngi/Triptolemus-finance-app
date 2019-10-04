import {
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  LOADING_ITEM,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  CLEAR_ITEMS

} from '../actions/types';
import { stat } from 'fs';

const initialState = {
  item: null,
  items: [],
  loading: false
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
        items: null,
        loading: false
      };
    case LOADING_ITEM:
      return {
        ...state,
        loading: true
      };
    case DELETE_ITEM_FAIL:
      return {
        ...state
      }
    case DELETE_ITEM_SUCCESS:
      return {
          ...state,
          items: payload
      }
    case CLEAR_ITEMS:
      return {
        ...state,
        items: []
      }
    default:
      return state;
  }
}
