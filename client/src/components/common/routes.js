// export const ROOT_API = 'http://ec2-54-251-169-63.ap-southeast-1.compute.amazonaws.com:8080'
export const ROOT_API = 'http://localhost:8080'

export const LOGIN_API = `${ROOT_API}/auth/login`
export const CREATE_A_USER_API = `${ROOT_API}/auth/signup`
export const GET_ALL_USERS_API = `${ROOT_API}/auth/all`
export const GET_CURRENT_USER_API = `${ROOT_API}/user/me`
export const GENERATE_TOKEN_API = `${ROOT_API}/user/token`
export const PW_RECOVERY_API = `${ROOT_API}/user/recover`
export const UPDATE_USER_API = `${ROOT_API}/user/me/update`
export const ADMIN_UPDATE_USER_API = `${ROOT_API}/user/update`
export const PASSWORD_CHANGE_API = `${ROOT_API}/user/pw/to`
export const BAN_USER_API = `${ROOT_API}/auth/ban`
export const UNBAN_USER_API = `${ROOT_API}/auth/unban`
export const GET_USER_BY_ID_API = `${ROOT_API}/auth/user/`
export const UPLOAD_PROFILE_PIC_API = `${ROOT_API}/photo/profile`
export const GET_ALL_LOGGED_IN_USERS_API = `${ROOT_API}/auth/loggedIn`

export const GET_LOCATIONS_API = `${ROOT_API}/loc`
export const GET_DELETE_UPDATE_LOCATION_BY_ID_API = `${ROOT_API}/loc/`
export const UPLOAD_LOCATION_PIC_API = `${ROOT_API}/photo/loc`

export const GET_TYPES_API = `${ROOT_API}/types`
export const GET_DELETE_UPDATE_TYPE_BY_ID_API = `${ROOT_API}/types/`

export const GET_TOURS_API = `${ROOT_API}/tours`
export const GET_TOURS_BY_NAME_API = `${ROOT_API}/tours/search/`
export const GET_DELETE_UPDATE_TOUR_BY_ID_API = `${ROOT_API}/tours/`
export const UPDATE_TOUR_API = `${ROOT_API}/tours/update`
export const ADD_REMOVE_LOC_FROM_TOUR_API = `${ROOT_API}/tours/loc?method=`
export const ADD_REMOVE_TYPE_FROM_TOUR_API = `${ROOT_API}/tours/type?method=`


export const getRequestConfig = () => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}


export const addToArray = (arr, elem) => {
  arr.push(elem)
  return arr;
}
