import axios from 'axios';
import { Cookies } from 'react-cookie';
import iziToast from 'izitoast';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';

const cookies = new Cookies();

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR';

export const DETAIL_PRODUCT_REQUEST = 'DETAIL_PRODUCT_REQUEST';
export const DETAIL_PRODUCT_SUCCESS = 'DETAIL_PRODUCT_SUCCESS';
export const DETAIL_PRODUCT_ERROR = 'DETAIL_PRODUCT_ERROR';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_ERROR = 'UPDATE_PRODUCT_ERROR';

export const UPDATE_STATUS_PRODUCT_REQUEST = 'UPDATE_STATUS_PRODUCT_REQUEST';
export const UPDATE_STATUS_PRODUCT_SUCCESS = 'UPDATE_STATUS_PRODUCT_SUCCESS';
export const UPDATE_STATUS_PRODUCT_ERROR = 'UPDATE_STATUS_PRODUCT_ERROR';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

const BASE_URL = `${URL_API}/product`;

const REDIRECT_URL = `/master/product`;

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_PRODUCT_REQUEST, loading: true });
    // dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: dummy.user });
    return axios({
      method: 'get',
      url: `${BASE_URL}`,
      params: data
    })
      .then(
        response => {
          dispatch({
            type: FETCH_PRODUCT_SUCCESS,
            payload: response.data
          });
        },
        error => {
          dispatch({ type: FETCH_PRODUCT_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_PRODUCT_ERROR, error });
        throw error;
      });
  };
}

export function detailData(code) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DETAIL_PRODUCT_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${BASE_URL}/code/${code}`
    }).then(
      response => {
        dispatch({
          type: DETAIL_PRODUCT_SUCCESS,
          payload: response.data
        });
        // console.log('responseDetail', response);
      },
      error => {
        dispatch({ type: DETAIL_PRODUCT_ERROR, error: error.response });
      }
    );
  };
}

export function createData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: CREATE_PRODUCT_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${BASE_URL}`,
      headers: {},
      data
    }).then(
      response => {
        dispatch({
          type: CREATE_PRODUCT_SUCCESS,
          payload: response.data
        });
        // console.log('response', response);
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully inserted record!'
        });
        // window.location.href = REDIRECT_URL;
        return response;
      },
      error => {
        dispatch({ type: CREATE_PRODUCT_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.stat_msg
        });
        throw error;
      }
    );
  };
}

export function updateData(data, id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${BASE_URL}/id/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(
      response => {
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: response.data
        });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully updated record!'
        });
        return response.data.data.code;
        // window.location.href = `${REDIRECT_URL}/edit/${response.data.data.code}`;
      },
      error => {
        dispatch({ type: UPDATE_PRODUCT_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.stat_msg
        });
        throw error;
      }
    );
  };
}

export function updateStatusData(data, id, params) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_STATUS_PRODUCT_REQUEST });
    return axios({
      method: 'POST',
      url: `${BASE_URL}/status/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(
      () => {
        dispatch({ type: UPDATE_STATUS_PRODUCT_SUCCESS });
        dispatch(fetchData(params));
      },
      error => {
        dispatch({
          type: UPDATE_STATUS_PRODUCT_ERROR,
          error: error.response
        });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Error!'
        });
      }
    );
  };
}

export function deleteData(id, params) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DELETE_PRODUCT_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${BASE_URL}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: response.data
        });
        dispatch(fetchData(params));
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully deleted record!'
        });
      },
      error => {
        dispatch({ type: DELETE_PRODUCT_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Error deleted data!'
        });
      }
    );
  };
}
