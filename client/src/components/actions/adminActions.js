import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  GET_ALL_USERS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  BAN_USER,
  UNBAN_USER,
  GET_USER_BY_ID,
  ADMIN_UPDATE_USER,
  ADMIN_UPDATE_USER_FAIL,
  GET_ALL_LOGGED_IN_USERS
} from './types';
import {
  CREATE_A_USER_API,
  GET_ALL_USERS_API,
  GET_USER_BY_ID_API,
  BAN_USER_API,
  UNBAN_USER_API,
  ADMIN_UPDATE_USER_API,
  UPLOAD_PROFILE_PIC_API,
  getRequestConfig,
  GET_ALL_LOGGED_IN_USERS_API
 } from './../common/routes';
import Swal from 'sweetalert2';


export const getUsers = () => (dispatch) => {

  axios
    .get(GET_ALL_USERS_API, getRequestConfig())
    .then(res =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data.payload.content
      }))
}

export const registerAUser = (user) => (dispatch) => {

  // Request body
  const body = JSON.stringify(user);
  axios
    .post(CREATE_A_USER_API, body, getRequestConfig())
    .then(res =>{
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      Swal.fire({
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(window.location.reload.bind(window.location), 2000);
    }
    )
    .catch(err => {
      if (err.response !== undefined) {
        dispatch(
          returnErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
          type: REGISTER_FAIL
        });
      }
    });
};

export const getAllLoggedInUsers = () => (dispatch) => {
  axios
  .get(GET_ALL_LOGGED_IN_USERS_API, getRequestConfig())
  .then(res => {
    dispatch({
      type: GET_ALL_LOGGED_IN_USERS,
      payload: res.data
    })
  })
}

export const uploadProfilePic = (pic) => (dispatch) => {
  const token = localStorage.getItem('accessToken');
  axios({
    method: 'post',
    url: UPLOAD_PROFILE_PIC_API,
    data: pic,
    headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
  })
}

export const adminUpdateUser = (user) => (dispatch) => {

  // Request body
  const body = JSON.stringify(user);
  axios
    .put(ADMIN_UPDATE_USER_API, body, getRequestConfig())
    .then(res =>{
      dispatch({
        type: ADMIN_UPDATE_USER,
        payload: res.data
      })
      Swal.fire({
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500
      })
    }
    )
    // .catch(err => {
    //   if (err.response !== undefined) {
    //     dispatch(
    //       returnErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL')
    //     );
    //     dispatch({
    //       type: ADMIN_UPDATE_USER_FAIL
    //     });
    //   }
    // });
};

export const getUserById = (id) => (dispatch) => {

  axios
    .get(GET_USER_BY_ID_API + id, getRequestConfig())
    .then(res => {
      dispatch({
        type: GET_USER_BY_ID,
        payload: res.data.payload
      })
    })
  // .catch(err => {
  //   dispatch(returnErrors(err.response.data.message, err.response.status));
  //   dispatch({
  //     type: GET_USER_BY_ID_FAIL
  //   });
  // });

}

export const banAUser = (username) => (dispatch) => {

  const body = JSON.stringify({username})
  axios
    .put(BAN_USER_API, body, getRequestConfig())
    .then(res =>{
      dispatch({
        type: BAN_USER
      })
    }

    )
}


export const unbanAUser = (username) => (dispatch) => {

  const body = JSON.stringify({ username })

  axios
    .put(UNBAN_USER_API, body, getRequestConfig())
    .then(res =>
      dispatch({
        type: UNBAN_USER
      })
    )
}
