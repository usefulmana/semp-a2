import {
  GET_TYPES,
  GET_TYPE_BY_ID,
  GET_TYPE_BY_ID_FAIL,
  ADD_TYPE,
  ADD_TYPE_FAIL,
  DELETE_TYPE,
  DELETE_TYPE_FAIL
} from './../actions/types'


const initialState = {
  types: null,
  type: null,
  query: null
};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      }
    case GET_TYPE_BY_ID:
      return {
        ...state,
        type: action.payload
      }
    case ADD_TYPE:
      return {
        ...state,
        type: action.payload
      }
    case DELETE_TYPE:
      const id = action.payload
      return {
        ...state,
        types: state.types.filter(item => item.id !== id)
      }
    case GET_TYPE_BY_ID_FAIL:
    case ADD_TYPE_FAIL:
    case DELETE_TYPE_FAIL:
    default:
      return state
  }
}
