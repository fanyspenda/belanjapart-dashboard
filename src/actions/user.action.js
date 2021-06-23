import axios from 'axios';
import { Cookies } from 'react-cookie';
import iziToast from 'izitoast';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';

const cookies = new Cookies();

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const DETAIL_USER_REQUEST = 'DETAIL_USER_REQUEST';
export const DETAIL_USER_SUCCESS = 'DETAIL_USER_SUCCESS';
export const DETAIL_USER_ERROR = 'DETAIL_USER_ERROR';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const UPDATE_STATUS_USER_REQUEST = 'UPDATE_STATUS_USER_REQUEST';
export const UPDATE_STATUS_USER_SUCCESS = 'UPDATE_STATUS_USER_SUCCESS';
export const UPDATE_STATUS_USER_ERROR = 'UPDATE_STATUS_USER_ERROR';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

const BASE_URL = `${URL_API}/user`;

const REDIRECT_URL = `/user`;

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_USER_REQUEST, loading: true });
    return axios({
      method: 'get',
      url: `${BASE_URL}`,
      params: data
    })
      .then(
        response => {
          dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
        },
        error => {
          dispatch({ type: FETCH_USER_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_USER_ERROR, error });
        throw error;
      });
  };
}

export function detailData(id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DETAIL_USER_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${BASE_URL}/id/${id}`
    }).then(
      response => {
        dispatch({ type: DETAIL_USER_SUCCESS, payload: response.data });
      },
      error => {
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message:
            error.response.data.stat_msg === 'sql: no rows in result set'
              ? 'User Has been deleted'
              : error.response.data.stat_msg
        });
        dispatch({ type: DETAIL_USER_ERROR, error: error.response });
      }
    );
  };
}

export function createData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: CREATE_USER_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${BASE_URL}`,
      headers: {},
      data
    }).then(
      response => {
        dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully inserted record!'
        });
        window.location.href = REDIRECT_URL;
      },
      error => {
        dispatch({ type: CREATE_USER_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.stat_msg
        });
      }
    );
  };
}

export function updateData(data, id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_USER_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${BASE_URL}/id/${id}`,
      headers: {},
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully updated record!'
        });
        window.location.href = REDIRECT_URL;
      },
      error => {
        dispatch({ type: UPDATE_USER_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.stat_msg
        });
      }
    );
  };
}

export function updateStatusData(data, id, params) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_STATUS_USER_REQUEST });
    return axios({
      method: 'POST',
      url: `${BASE_URL}/status/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(
      () => {
        dispatch({ type: UPDATE_STATUS_USER_SUCCESS });
        dispatch(fetchData(params));
      },
      error => {
        dispatch({ type: UPDATE_STATUS_USER_ERROR, error: error.response });
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
    dispatch({ type: DELETE_USER_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${BASE_URL}/id/${id}`
    }).then(
      response => {
        dispatch({ type: DELETE_USER_SUCCESS, payload: response.data });
        dispatch(fetchData(params));
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully deleted record!'
        });
      },
      error => {
        dispatch({ type: DELETE_USER_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Error deleted data!'
        });
      }
    );
  };
}
