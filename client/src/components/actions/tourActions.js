import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  GET_TOURS,
  GET_TOUR_BY_ID,
  ADD_TOUR,
  ADD_TOUR_FAIL,
  UPDATE_TOUR,
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
  ADD_REMOVE_LOC_FROM_TOUR_API
}
  from '../common/routes';
import Swal from 'sweetalert2';


export const getTours = () => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  axios
    .get(GET_TOURS_API, config)
    .then(res =>
      dispatch({
        type: GET_TOURS,
        payload: res.data.payload.content
      }))
}

export const getTourById = (id) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  axios
    .get(GET_DELETE_UPDATE_TOUR_BY_ID_API + id, config)
    .then (res => {
      dispatch({
        type: GET_TOUR_BY_ID,
        payload: res.data.payload
      })
    })
}

export const createTour = (tour) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  const body = JSON.stringify(tour)
  axios
    .post(GET_TOURS_API, body, config)
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
    .catch(err => {
      dispatch(returnErrors(err.response.data.payload.message, err.response.status));
      dispatch({
        type: ADD_TOUR_FAIL
      });
    });
}

export const deleteTourById = (id) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  axios
    .delete(GET_DELETE_UPDATE_TOUR_BY_ID_API + id, config)
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

export const addRemoveLocToTour = (tour_id, loc_id, method) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  const body = JSON.stringify({ tour_id, loc_id })
  if (method === "remove") {
    axios
      .patch(ADD_REMOVE_LOC_FROM_TOUR_API + method, body, config)
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
      .patch(ADD_REMOVE_LOC_FROM_TOUR_API + method, body, config)
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
        console.log(err.response)
        dispatch(returnErrors(err.response.data.message, err.response.status));
        dispatch({
          type: ADD_LOC_TO_TOUR_FAIL
        });
      });
  }
}


export const addRemoveTypeToTour = (tour_id, type_id, method) => (dispatch, getState) => {
  const token = getState().auth.accessToken;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  const body = { tour_id, type_id }

  if (method === "remove") {
    axios
      .patch(ADD_REMOVE_TYPE_FROM_TOUR_API + method, body, config)
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
      .patch(ADD_REMOVE_TYPE_FROM_TOUR_API + method, body, config)
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