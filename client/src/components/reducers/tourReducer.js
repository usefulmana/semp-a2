import {
  GET_TOURS,
  GET_TOUR_BY_ID,
  ADD_TOUR,
  ADD_TOUR_FAIL,
  UPDATE_TOUR,
  UPDATE_TOUR_FAIL,
  DELETE_TOUR,
  DELETE_TOUR_FAIL,
  ADD_LOC_TO_TOUR,
  REMOVE_LOC_TO_TOUR,
  ADD_TYPE_TO_TOUR,
  REMOVE_TYPE_TO_TOUR,
  GET_TOUR_BY_NAME,
  GET_TOUR_BY_NAME_FAIL
} from './../actions/types';
import { addToArray } from '../common/routes';

const initialState = {
  tours: null,
  tour: null,
  query_result: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOURS:
      return {
        ...state,
        tours: action.payload
      }
    case GET_TOUR_BY_ID:
      return {
        ...state,
        tour: action.payload
      }
    case ADD_TOUR:
      return {
        ...state,
        tours: addToArray(state.tours, action.payload)
      }
    case DELETE_TOUR:
      const idToBeDeleted = action.payload
      return {
        ...state,
        tours: state.tours.filter(item => item.id !== idToBeDeleted)
      }
    case UPDATE_TOUR:
      return {
        ...state,
        tour: action.payload
      }
    case GET_TOUR_BY_NAME:
      return {
        ...state,
        tours: action.payload
      }
    case GET_TOUR_BY_NAME_FAIL:
    case UPDATE_TOUR_FAIL:
    case ADD_TOUR_FAIL:
    case DELETE_TOUR_FAIL:
    case ADD_LOC_TO_TOUR:
    case ADD_TYPE_TO_TOUR:
    case REMOVE_LOC_TO_TOUR:
    case REMOVE_TYPE_TO_TOUR:
    default:
      return state
  }
}
