import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GENERATE_TOKEN,
  GENERATE_TOKEN_FAIL,
  GET_USER_BY_ID,
  GET_USER_BY_ID_FAIL,
  TOKEN_GENERATED,
  PASSWORD_RECOVERED,
  PASSWORD_RECOVERY_FAILED,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  PASSWORD_CHANGED,
  PASSWORD_CHANGE_FAIL,
} from '../actions/types';


const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  message: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('accessToken', action.payload.accessToken)
      return {
        ...state,
        user: action.payload.object,
        isAuthenticated: true,
        isLoading: false
      };
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case GENERATE_TOKEN:
    case GENERATE_TOKEN_FAIL:
    case PASSWORD_CHANGE_FAIL:
    case PASSWORD_CHANGED:
      return {
        ...state
      }
    case TOKEN_GENERATED:
      return {
        ...state,
        message: action.payload
      }
    case PASSWORD_RECOVERED:
      return {
        ...state,
        message: action.payload
      }
    case PASSWORD_RECOVERY_FAILED:
    case UPDATE_SUCCESS: {
      return {
        ...state,
        user: action.payload
      }
    }
    case UPDATE_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('accessToken')
      return {
        ...state,
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
