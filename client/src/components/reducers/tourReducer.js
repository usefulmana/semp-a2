import {
  GET_TOURS,
  GET_TOUR_BY_ID,
  ADD_TOUR,
  ADD_TOUR_FAIL,
  UPDATE_TOUR,
  DELETE_TOUR,
  DELETE_TOUR_FAIL,
  ADD_LOC_TO_TOUR,
  REMOVE_LOC_TO_TOUR,
  ADD_TYPE_TO_TOUR,
  REMOVE_TYPE_TO_TOUR
} from './../actions/types';

const initialState = {
  tours: null,
  tour: null,
  query: null
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
        tour: action.payload
      }
    case DELETE_TOUR:
      const idToBeDeleted = action.payload
      return {
        ...state,
        tours: state.tours.filter(item => item.id !== idToBeDeleted)
      }
    case ADD_LOC_TO_TOUR:
    case ADD_TYPE_TO_TOUR:
    case REMOVE_LOC_TO_TOUR:
    case REMOVE_TYPE_TO_TOUR:
    default:
      return state
  }
}