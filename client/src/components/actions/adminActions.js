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
  ADMIN_UPDATE_USER_FAIL
} from './types';
import { CREATE_A_USER_API, GET_ALL_USERS_API, GET_USER_BY_ID_API, BAN_USER_API, UNBAN_USER_API, ADMIN_UPDATE_USER_API } from './../common/routes';
import Swal from 'sweetalert2';


export const getUsers = () => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  axios
    .get(GET_ALL_USERS_API, config)
    .then(res =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data.payload.content
      }))
}

export const registerAUser = (user) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  // Request body
  const body = JSON.stringify(user);
  axios
    .post(CREATE_A_USER_API, body, config)
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

export const adminUpdateUser = (user) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  // Request body
  const body = JSON.stringify(user);
  axios
    .put(ADMIN_UPDATE_USER_API, body, config)
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

export const getUserById = (id) => (dispatch, getState) => {
  const config = {
    headers: {
    }
  };
  const token = getState().auth.accessToken;
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  axios
    .get(GET_USER_BY_ID_API + id, config)
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

export const banAUser = (username) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  const body = JSON.stringify({username})
  axios
    .put(BAN_USER_API, body, config)
    .then(res =>{
      console.log(res)
      dispatch({
        type: BAN_USER
      })
    }

    )
}


export const unbanAUser = (username) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  const body = JSON.stringify({ username })

  axios
    .put(UNBAN_USER_API, body, config)
    .then(res =>
      dispatch({
        type: UNBAN_USER
      })
    )
}
