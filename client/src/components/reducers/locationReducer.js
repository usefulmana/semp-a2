
import {
  GET_LOCATIONS,
  GET_LOCATION_BY_ID,
  GET_LOCATION_BY_ID_FAIL,
  DELETE_LOCATION,
  ADD_LOCATION,
  ADD_LOCATION_FAIL,
  DELETE_LOCATION_FAIL
} from '../actions/types';

const initialState = {
  locations: null,
  location: null,
  query: null
};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      }
    case GET_LOCATION_BY_ID:
      return {
        ...state,
        location: action.payload
      }
    case ADD_LOCATION:
      return {
        ...state,
        location: action.payload
      }
    case DELETE_LOCATION:
      const idToBeDeleted = action.payload
      return {
        ...state,
        locations: state.locations.filter(item => item.id !== idToBeDeleted)
      }
    case ADD_LOCATION_FAIL:
    case DELETE_LOCATION_FAIL:
    case GET_LOCATION_BY_ID_FAIL:
    default:
      return state;
  }
}
