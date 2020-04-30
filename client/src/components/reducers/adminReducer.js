import { GET_ALL_USERS, BAN_USER, UNBAN_USER } from "../actions/types";

const initialState = {
  users: null
};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      }
    case BAN_USER:
    case UNBAN_USER:
    default:
      return state
  }
}
