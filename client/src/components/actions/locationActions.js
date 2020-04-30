import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  GET_LOCATIONS,
  GET_LOCATION_BY_ID,
  ADD_LOCATION,
  DELETE_LOCATION,
  ADD_LOCATION_FAIL,
  DELETE_LOCATION_FAIL,
  GET_LOCATION_BY_ID_FAIL
} from './types'
import {
  GET_DELETE_UPDATE_LOCATION_BY_ID_API,
  GET_LOCATIONS_API
} from '../common/routes';
import Swal from 'sweetalert2';


export const getLocations = () => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  axios
    .get(GET_LOCATIONS_API, config)
    .then(res =>
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data.payload.content
      }))
}

export const getLocationById = (id) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  axios
    .get(GET_DELETE_UPDATE_LOCATION_BY_ID_API + id, config)
    .then(res =>
      dispatch({
        type: GET_LOCATION_BY_ID,
        payload: res.data.payload
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data.payload.message, err.response.status));
      dispatch({
        type: GET_LOCATION_BY_ID_FAIL
      });
    });
}

export const createLocation = (location) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  const body = JSON.stringify(location)
  axios
    .post(GET_LOCATIONS_API, body, config)
    .then(res =>{
      dispatch({
        type: ADD_LOCATION,
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
        type: ADD_LOCATION_FAIL
      });
    });
}

export const deleteLocationById = (id) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  axios
    .delete(GET_DELETE_UPDATE_LOCATION_BY_ID_API + id, config)
    .then(res =>{
      dispatch({
        type: DELETE_LOCATION,
        payload: id
      })
    }

    )
  // .catch(err => {
  //   dispatch(returnErrors(err.response.data.payload.message, err.response.status));
  //   dispatch({
  //     type: DELETE_LOCATION_FAIL
  //   });
  // });
}
