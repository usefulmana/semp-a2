import { GET_ALL_USERS,
  BAN_USER,
  UNBAN_USER,
  GET_USER_BY_ID,
  ADMIN_UPDATE_USER,
  ADMIN_UPDATE_USER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";
import { addToArray } from "../common/routes";
import { GET_ALL_LOGGED_IN_USERS } from './../actions/types';

const initialState = {
  users: null,
  loggedInUsers: null,
  user: null
};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      }
    case GET_ALL_LOGGED_IN_USERS:
      return {
        ...state,
        loggedInUsers: action.payload.payload
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        users: addToArray(state.users, action.payload)
      }
    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload
      }
    case ADMIN_UPDATE_USER:
      return {
        ...state,
        user: action.payload
      }
    case ADMIN_UPDATE_USER_FAIL:
    case BAN_USER:
    case UNBAN_USER:
    default:
      return state
  }
}
