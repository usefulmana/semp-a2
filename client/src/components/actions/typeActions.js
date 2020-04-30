import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  GET_TYPES,
  GET_TYPE_BY_ID,
  GET_TYPE_BY_ID_FAIL,
  ADD_TYPE,
  ADD_TYPE_FAIL,
  DELETE_TYPE,
  DELETE_TYPE_FAIL
} from './types'
import {
  GET_TYPES_API,
  GET_DELETE_UPDATE_TYPE_BY_ID_API
} from '../common/routes';
import Swal from 'sweetalert2';

export const getTypes = () => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  axios
    .get(GET_TYPES_API, config)
    .then(res =>
      dispatch({
        type: GET_TYPES,
        payload: res.data.payload.content
      }))
}

export const getTypeById = (id) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  axios
    .get(GET_DELETE_UPDATE_TYPE_BY_ID_API + id, config)
    .then(res =>
      dispatch({
        type: GET_TYPE_BY_ID,
        payload: res.data.payload
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data.payload.message, err.response.status));
      dispatch({
        type: GET_TYPE_BY_ID_FAIL
      });
    });
}

export const createType = (type) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  const body = JSON.stringify(type)
  axios
    .post(GET_TYPES_API, body, config)
    .then(res =>{
      dispatch({
        type: ADD_TYPE,
        payload: res.data.payload
      })
      Swal.fire({
        icon: 'success',
        title: 'Created',
        showConfirmButton: false,
        timer: 1500
      })
    }

    )
    .catch(err => {
      dispatch(returnErrors(err.response.data.payload.message, err.response.status));
      dispatch({
        type: ADD_TYPE_FAIL
      });
    });
}

export const deleteTypeById = (id) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  axios
    .delete(GET_DELETE_UPDATE_TYPE_BY_ID_API + id, config)
    .then(res =>
      dispatch({
        type: DELETE_TYPE,
        payload: id
      })
    )
  // .catch(err => {
  //   dispatch(returnErrors(err.response.data.payload.message, err.response.status));
  //   dispatch({
  //     type: DELETE_TYPE_FAIL
  //   });
  // });
}
