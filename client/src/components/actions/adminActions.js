import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  GET_ALL_USERS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  BAN_USER,
  UNBAN_USER
} from './types';
import { CREATE_A_USER_API, GET_ALL_USERS_API, BAN_USER_API, UNBAN_USER_API } from './../common/routes';

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
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
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
