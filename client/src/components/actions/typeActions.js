import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  GET_TYPES,
  GET_TYPE_BY_ID,
  GET_TYPE_BY_ID_FAIL,
  ADD_TYPE,
  ADD_TYPE_FAIL,
  DELETE_TYPE,
  DELETE_TYPE_FAIL,
  UPDATE_TYPE,
  UPDATE_TYPE_FAIL
} from './types'
import {
  GET_TYPES_API,
  GET_DELETE_UPDATE_TYPE_BY_ID_API,
  getRequestConfig
} from '../common/routes';
import Swal from 'sweetalert2';

export const getTypes = () => (dispatch) => {
  axios
    .get(GET_TYPES_API, getRequestConfig())
    .then(res =>
      dispatch({
        type: GET_TYPES,
        payload: res.data.payload.content
      }))
}

export const getTypeById = (id) => (dispatch) => {
  axios
    .get(GET_DELETE_UPDATE_TYPE_BY_ID_API + id, getRequestConfig())
    .then(res =>
      dispatch({
        type: GET_TYPE_BY_ID,
        payload: res.data.payload
      })
    )
    // .catch(err => {
    //   dispatch(returnErrors(err.response.data.payload.message, err.response.status));
    //   dispatch({
    //     type: GET_TYPE_BY_ID_FAIL
    //   });
    // });
}

export const createType = (type) => (dispatch) => {
  const body = JSON.stringify(type)
  axios
    .post(GET_TYPES_API, body, getRequestConfig())
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



export const updateType = (type) => (dispatch) => {

  const body = JSON.stringify(type)
  axios
    .put(GET_TYPES_API, body, getRequestConfig())
    .then(res => {
      dispatch({
        type: UPDATE_TYPE,
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
        type: UPDATE_TYPE_FAIL
      });
    });
}

export const deleteTypeById = (id) => (dispatch) => {
  axios
    .delete(GET_DELETE_UPDATE_TYPE_BY_ID_API + id, getRequestConfig())
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
