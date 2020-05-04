import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  GET_TOURS,
  GET_TOUR_BY_ID,
  GET_TOUR_BY_NAME,
  GET_TOUR_BY_NAME_FAIL,
  ADD_TOUR,
  ADD_TOUR_FAIL,
  UPDATE_TOUR,
  UPDATE_TOUR_FAIL,
  DELETE_TOUR,
  DELETE_TOUR_FAIL,
  ADD_LOC_TO_TOUR,
  ADD_LOC_TO_TOUR_FAIL,
  REMOVE_LOC_TO_TOUR,
  REMOVE_LOC_TO_TOUR_FAIL,
  ADD_TYPE_TO_TOUR,
  ADD_TYPE_TO_TOUR_FAIL,
  REMOVE_TYPE_TO_TOUR,
  REMOVE_TYPE_TO_TOUR_FAIL
} from './types';
import {
  GET_TOURS_API,
  GET_DELETE_UPDATE_TOUR_BY_ID_API,
  ADD_REMOVE_TYPE_FROM_TOUR_API,
  ADD_REMOVE_LOC_FROM_TOUR_API,
  UPDATE_TOUR_API,
  GET_TOURS_BY_NAME_API,
  getRequestConfig
}
  from '../common/routes';
import Swal from 'sweetalert2';


export const getTours = () => (dispatch) => {

  axios
    .get(GET_TOURS_API, getRequestConfig())
    .then(res =>
      dispatch({
        type: GET_TOURS,
        payload: res.data.payload.content
      }))
}

export const getTourById = (id) => (dispatch) => {


  axios
    .get(GET_DELETE_UPDATE_TOUR_BY_ID_API + id, getRequestConfig())
    .then (res => {
      dispatch({
        type: GET_TOUR_BY_ID,
        payload: res.data.payload
      })
    })
}

export const getToursByName = (name) => (dispatch) => {

  axios
    .get(GET_TOURS_BY_NAME_API + name, getRequestConfig())
    .then(res => {
      dispatch({
        type: GET_TOUR_BY_NAME,
        payload: res.data.payload.content
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data.payload.message, err.response.status));
      dispatch({
        type: GET_TOUR_BY_NAME_FAIL
      });
    });
}

export const createTour = (tour) => (dispatch) => {


  const body = JSON.stringify(tour)
  axios
    .post(GET_TOURS_API, body, getRequestConfig())
    .then(res =>{
      dispatch({
        type: ADD_TOUR,
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
    // .catch(err => {
    //   dispatch(returnErrors(err.response.data.payload.message, err.response.status));
    //   dispatch({
    //     type: ADD_TOUR_FAIL
    //   });
    // });
}

export const deleteTourById = (id) => (dispatch) => {

  axios
    .delete(GET_DELETE_UPDATE_TOUR_BY_ID_API + id, getRequestConfig())
    .then(res =>
      dispatch({
        type: DELETE_TOUR,
        payload: id
      })
    )
  // .catch(err => {
  //   dispatch(returnErrors(err.response.data.payload.message, err.response.status));
  //   dispatch({
  //     type: DELETE_LOCATION_FAIL
  //   });
  // });
}

export const updateTour = (tour) => (dispatch) => {

  const body = JSON.stringify(tour)
  axios
    .put(UPDATE_TOUR_API, body, getRequestConfig())
    .then(res =>{
      dispatch({
        type: UPDATE_TOUR,
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
      type: UPDATE_TOUR_FAIL
    });
  });
}

export const addRemoveLocToTour = (tour_id, loc_id, method) => (dispatch) => {

  const body = JSON.stringify({ tour_id, loc_id })
  if (method === "remove") {
    axios
      .patch(ADD_REMOVE_LOC_FROM_TOUR_API + method, body, getRequestConfig())
      .then(res => {
        dispatch({
          type: REMOVE_LOC_TO_TOUR,
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

        dispatch(returnErrors(err.response.data.message, err.response.status));
        dispatch({
          type: REMOVE_LOC_TO_TOUR_FAIL
        });
      });
  }
  else if (method === "add") {
    axios
      .patch(ADD_REMOVE_LOC_FROM_TOUR_API + method, body, getRequestConfig())
      .then(res => {
        dispatch({
          type: ADD_LOC_TO_TOUR,
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
        dispatch(returnErrors(err.response.data.message, err.response.status));
        dispatch({
          type: ADD_LOC_TO_TOUR_FAIL
        });
      });
  }
}


export const addRemoveTypeToTour = (tour_id, type_id, method) => (dispatch) => {


  const body = { tour_id, type_id }

  if (method === "remove") {
    axios
      .patch(ADD_REMOVE_TYPE_FROM_TOUR_API + method, body, getRequestConfig())
      .then(res => {
        dispatch({
          type: REMOVE_TYPE_TO_TOUR,
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
        dispatch(returnErrors(err.response.data.message, err.response.status));
        dispatch({
          type: REMOVE_TYPE_TO_TOUR_FAIL
        });
      });
  }
  else if (method === "add") {
    axios
      .patch(ADD_REMOVE_TYPE_FROM_TOUR_API + method, body, getRequestConfig())
      .then(res => {
        dispatch({
          type: ADD_TYPE_TO_TOUR,
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
        dispatch(returnErrors(err.response.data.message, err.response.status));
        dispatch({
          type: ADD_TYPE_TO_TOUR_FAIL
        });
      });
  }
}
