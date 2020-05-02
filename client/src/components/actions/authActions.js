import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  GENERATE_TOKEN,
  TOKEN_GENERATED,
  GENERATE_TOKEN_FAIL,
  PASSWORD_RECOVERED,
  PASSWORD_RECOVERY_FAILED,
  PASSWORD_CHANGED,
  PASSWORD_CHANGE_FAIL,
  GET_USER_BY_ID,
  GET_USER_BY_ID_FAIL
} from './types';
import {
  LOGIN_API,
  GET_CURRENT_USER_API,
  GENERATE_TOKEN_API,
  PW_RECOVERY_API,
  UPDATE_USER_API,
  PASSWORD_CHANGE_API,
  GET_USER_BY_ID_API
} from './../common/routes';
import Swal from 'sweetalert2';

// Login User
export const login = ({ username, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
  const body = JSON.stringify({ username, password });
  axios
    .post(LOGIN_API, body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response !== undefined) {
        dispatch(
          returnErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
          type: LOGIN_FAIL
        });
      }
    });
};


export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Check token & load user

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
    }
  };

  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  axios.get(GET_CURRENT_USER_API, config)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
  // .catch(err => {
  //   console.log(err.response)
  //   dispatch(returnErrors(err.response.data.message, err.response.status));
  //   dispatch({
  //     type: AUTH_ERROR
  //   });
  // });
};



export const updateUser = ({ name, email }) => (dispatch, getState) => {

  const config = {
    headers: {
      'content-type': 'application/json'
    }
  };
  const token = getState().auth.accessToken;
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  const body = JSON.stringify({ name, email });

  axios
    .put(UPDATE_USER_API, body, config)
    .then(res =>{
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data
      })
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        showConfirmButton: false,
        timer: 1500
      })
    }

    )
    .catch(err => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
      dispatch({
        type: UPDATE_FAIL
      });
    });

};

export const generateToken = ({ email, type }) => dispatch => {
  dispatch({ type: GENERATE_TOKEN });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
  const body = JSON.stringify({ email, type });
  axios
    .post(GENERATE_TOKEN_API, body, config)
    .then(res =>
      dispatch({
        type: TOKEN_GENERATED,
        payload: res.data
      })

    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data.message, err.response.status, 'GENERATE_TOKEN_FAIL')
      );
      dispatch({
        type: GENERATE_TOKEN_FAIL
      });
    });
}

export const recoverPassword = ({ token, password }) => dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
  const body = JSON.stringify({ token, password });
  axios
    .post(PW_RECOVERY_API, body, config)
    .then(res =>{
      dispatch({
        type: PASSWORD_RECOVERED,
        payload: res.data
      })
    }

    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data.message, err.response.status, 'PASSWORD_RECOVERY_FAILED')
      );
      dispatch({
        type: PASSWORD_RECOVERY_FAILED
      });
    });
}

export const changePassword = ({ oldpassword, newpassword }) => (dispatch, getState) => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const token = getState().auth.accessToken;
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  // Request body
  const body = JSON.stringify({ oldpassword, newpassword });
  axios
    .post(PASSWORD_CHANGE_API, body, config)
    .then(res =>
      dispatch({
        type: PASSWORD_CHANGED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data.message, err.response.status, 'PASSWORD_CHANGED_FAIL')
      );
      dispatch({
        type: PASSWORD_CHANGE_FAIL
      });
    });
}
