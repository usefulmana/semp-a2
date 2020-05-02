import { GET_ALL_USERS,
  BAN_USER,
  UNBAN_USER,
  GET_USER_BY_ID,
  ADMIN_UPDATE_USER,
  ADMIN_UPDATE_USER_FAIL
} from "../actions/types";

const initialState = {
  users: null,
  user: null
};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
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
