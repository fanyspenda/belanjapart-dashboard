import axios from 'axios';
import { Cookies } from 'react-cookie';
import iziToast from 'izitoast';
import swal from 'sweetalert2';
import { URL_API } from '../config/keys';

import httpService from '../services/http.service';

const cookies = new Cookies();

export const FETCH_FEE_REQUEST = 'FETCH_FEE_REQUEST';
export const FETCH_FEE_SUCCESS = 'FETCH_FEE_SUCCESS';
export const FETCH_FEE_ERROR = 'FETCH_FEE_ERROR';

export const DETAIL_FEE_REQUEST = 'DETAIL_FEE_REQUEST';
export const DETAIL_FEE_SUCCESS = 'DETAIL_FEE_SUCCESS';
export const DETAIL_FEE_ERROR = 'DETAIL_FEE_ERROR';

export const CREATE_FEE_REQUEST = 'CREATE_FEE_REQUEST';
export const CREATE_FEE_SUCCESS = 'CREATE_FEE_SUCCESS';
export const CREATE_FEE_ERROR = 'CREATE_FEE_ERROR';

export const UPDATE_FEE_REQUEST = 'UPDATE_FEE_REQUEST';
export const UPDATE_FEE_SUCCESS = 'UPDATE_FEE_SUCCESS';
export const UPDATE_FEE_ERROR = 'UPDATE_FEE_ERROR';

export const DELETE_FEE_REQUEST = 'DELETE_FEE_REQUEST';
export const DELETE_FEE_SUCCESS = 'DELETE_FEE_SUCCESS';
export const DELETE_FEE_ERROR = 'DELETE_FEE_ERROR';

export function fetchData(params) {
  return dispatch => {
    dispatch({ type: FETCH_FEE_REQUEST, loading: true });
    return httpService.get(`/fee`, { params }).then(
      response => {
        dispatch({ type: FETCH_FEE_SUCCESS, payload: response.data });
        return response;
      },
      error => {
        dispatch({ type: FETCH_FEE_ERROR, error: error.response });
      }
    );
  };
}

export function detailData(id) {
  return dispatch => {
    dispatch({ type: DETAIL_FEE_REQUEST, loading: true });
    return httpService.get(`/fee/id/${id}`).then(
      response => {
        dispatch({ type: DETAIL_FEE_SUCCESS, payload: response.data });
        return response;
      },
      error => {
        dispatch({ type: DETAIL_FEE_ERROR, error: error.response });
      }
    );
  };
}

export function createData(data) {
  return dispatch => {
    dispatch({ type: CREATE_FEE_REQUEST, loading: true });
    return httpService.post(`/fee`, data).then(
      response => {
        dispatch({ type: CREATE_FEE_SUCCESS, payload: response.data });
        swal.fire('Success!', 'Data created!', 'success');
        return response;
      },
      error => {
        dispatch({ type: CREATE_FEE_ERROR, error: error.response });
      }
    );
  };
}

export function updateData(id, data) {
  return dispatch => {
    dispatch({ type: UPDATE_FEE_REQUEST, loading: true });
    return httpService.put(`/fee/id/${id}`, data).then(
      response => {
        dispatch({ type: UPDATE_FEE_SUCCESS, payload: response.data });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully updated record!'
        });
        return response;
      },
      error => {
        dispatch({ type: UPDATE_FEE_ERROR, error: error.response });
      }
    );
  };
}

export function deleteData(id) {
  return dispatch => {
    dispatch({ type: DELETE_FEE_REQUEST, loading: true });
    return httpService.delete(`/fee/id/${id}`).then(
      response => {
        dispatch({ type: DELETE_FEE_SUCCESS, payload: response.data });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully deleted record!'
        });
        dispatch(fetchData({ page: 1, limit: 50, status: true }));
        return response;
      },
      error => {
        dispatch({ type: DELETE_FEE_ERROR, error: error.response });
      }
    );
  };
}

export const NULL_FILE_SUCCESS = 'NULL_FILE_SUCCESS';

export const CREATE_FILE_REQUEST = 'CREATE_FILE_REQUEST';
export const CREATE_FILE_PROGRESS = 'CREATE_FILE_PROGRESS';
export const CREATE_FILE_SUCCESS = 'CREATE_FILE_SUCCESS';
export const CREATE_FILE_ERROR = 'CREATE_FILE_ERROR';

export function nullFile() {
  return dispatch => dispatch({ type: NULL_FILE_SUCCESS });
}

export function uploadFile(data, futurePage) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: CREATE_FILE_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${URL_API}/import/shipping_fee`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data,
      onUploadProgress: evt => {
        if (evt.loaded && evt.total) {
          const progress = Math.round((evt.loaded * 100) / evt.total);
          dispatch({
            type: CREATE_FILE_PROGRESS,
            payload: progress
          });
        }
      }
    }).then(
      response => {
        dispatch({
          type: CREATE_FILE_SUCCESS,
          payload: response.data
        });
        const { data } = response.data;
        if (data.fail) {
          iziToast.warning({
            title: 'Warning',
            position: 'topRight',
            message: response.data.data.messages
          });
        } else {
          iziToast.success({
            title: 'Success',
            position: 'topRight',
            message: 'Successfully insert csv!'
          });
          dispatch(
            fetchData({ page: futurePage || 1, limit: 10, status: true })
          );
        }
        return response;
      },
      error => {
        dispatch({ type: CREATE_FILE_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.data.messages
        });
        throw error;
      }
    );
  };
}
