import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  GET_LOCATIONS,
  GET_LOCATION_BY_ID,
  ADD_LOCATION,
  DELETE_LOCATION,
  ADD_LOCATION_FAIL,
  DELETE_LOCATION_FAIL,
  GET_LOCATION_BY_ID_FAIL,
  UPDATE_LOCATION,
  UPDATE_LOCATION_FAIL
} from './types'
import {
  GET_DELETE_UPDATE_LOCATION_BY_ID_API,
  GET_LOCATIONS_API,
  getRequestConfig
} from '../common/routes';
import Swal from 'sweetalert2';


export const getLocations = () => (dispatch) => {
  axios
    .get(GET_LOCATIONS_API, getRequestConfig())
    .then(res =>
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data.payload.content
      }))
}

export const getLocationById = (id) => (dispatch) => {


  axios
    .get(GET_DELETE_UPDATE_LOCATION_BY_ID_API + id, getRequestConfig())
    .then(res =>{
      dispatch({
        type: GET_LOCATION_BY_ID,
        payload: res.data.payload
      })
    }

    )
    // .catch(err => {
    //   dispatch(returnErrors(err.response.data.payload.message, err.response.status));
    //   dispatch({
    //     type: GET_LOCATION_BY_ID_FAIL
    //   });
    // });
}

export const createLocation = (location) => (dispatch) => {

  const body = JSON.stringify(location)
  axios
    .post(GET_LOCATIONS_API, body, getRequestConfig())
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
    // .catch(err => {
    //   dispatch(returnErrors(err.response.data.payload.message, err.response.status));
    //   dispatch({
    //     type: ADD_LOCATION_FAIL
    //   });
    // });
}


export const updateLocation = (location) => (dispatch) => {

  const body = JSON.stringify(location)
  axios
    .put(GET_LOCATIONS_API, body, getRequestConfig())
    .then(res => {
      dispatch({
        type: UPDATE_LOCATION,
        payload: res.data.payload
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
      dispatch(returnErrors(err.response.data.payload.message, err.response.status));
      dispatch({
        type: UPDATE_LOCATION_FAIL
      });
    });
}

export const deleteLocationById = (id) => (dispatch) => {

  axios
    .delete(GET_DELETE_UPDATE_LOCATION_BY_ID_API + id, getRequestConfig())
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
