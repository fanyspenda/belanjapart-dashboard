import axios from 'axios';
import { Cookies } from 'react-cookie';
import iziToast from 'izitoast';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';

const cookies = new Cookies();

export const FETCH_ADMIN_REQUEST = 'FETCH_ADMIN_REQUEST';
export const FETCH_ADMIN_SUCCESS = 'FETCH_ADMIN_SUCCESS';
export const FETCH_ADMIN_ERROR = 'FETCH_ADMIN_ERROR';

export const DETAIL_ADMIN_REQUEST = 'DETAIL_ADMIN_REQUEST';
export const DETAIL_ADMIN_SUCCESS = 'DETAIL_ADMIN_SUCCESS';
export const DETAIL_ADMIN_ERROR = 'DETAIL_ADMIN_ERROR';

export const CREATE_ADMIN_REQUEST = 'CREATE_ADMIN_REQUEST';
export const CREATE_ADMIN_SUCCESS = 'CREATE_ADMIN_SUCCESS';
export const CREATE_ADMIN_ERROR = 'CREATE_ADMIN_ERROR';

export const UPDATE_ADMIN_REQUEST = 'UPDATE_ADMIN_REQUEST';
export const UPDATE_ADMIN_SUCCESS = 'UPDATE_ADMIN_SUCCESS';
export const UPDATE_ADMIN_ERROR = 'UPDATE_ADMIN_ERROR';

export const UPDATE_STATUS_ADMIN_REQUEST = 'UPDATE_STATUS_ADMIN_REQUEST';
export const UPDATE_STATUS_ADMIN_SUCCESS = 'UPDATE_STATUS_ADMIN_SUCCESS';
export const UPDATE_STATUS_ADMIN_ERROR = 'UPDATE_STATUS_ADMIN_ERROR';

export const DELETE_ADMIN_REQUEST = 'DELETE_ADMIN_REQUEST';
export const DELETE_ADMIN_SUCCESS = 'DELETE_ADMIN_SUCCESS';
export const DELETE_ADMIN_ERROR = 'DELETE_ADMIN_ERROR';

export const FETCH_CURRENT_ADMIN = 'FETCH_CURRENT_ADMIN';

const BASE_URL = `${URL_API}/admin`;

const REDIRECT_URL = `/admin`;

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_ADMIN_REQUEST, loading: true });
    // dispatch({ type: FETCH_ADMIN_SUCCESS, payload: dummy.user });
    return axios({
      method: 'get',
      url: `${BASE_URL}`,
      params: data
    })
      .then(
        response => {
          dispatch({ type: FETCH_ADMIN_SUCCESS, payload: response.data });
        },
        error => {
          dispatch({ type: FETCH_ADMIN_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_ADMIN_ERROR, error });
        throw error;
      });
  };
}

export function detailData(id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DETAIL_ADMIN_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${BASE_URL}/id/${id}`
    }).then(
      response => {
        dispatch({ type: DETAIL_ADMIN_SUCCESS, payload: response.data });
      },
      error => {
        dispatch({ type: DETAIL_ADMIN_ERROR, error: error.response });
      }
    );
  };
}

export function createData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: CREATE_ADMIN_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${BASE_URL}/register`,
      headers: {},
      data
    }).then(
      response => {
        dispatch({ type: CREATE_ADMIN_SUCCESS, payload: response.data });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully inserted record!'
        });
        window.location.href = REDIRECT_URL;
      },
      error => {
        dispatch({ type: CREATE_ADMIN_ERROR, error: error.response });
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
    dispatch({ type: UPDATE_ADMIN_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${BASE_URL}/id/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_ADMIN_SUCCESS, payload: response.data });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully updated record!'
        });
        window.location.href = REDIRECT_URL;
      },
      error => {
        dispatch({ type: UPDATE_ADMIN_ERROR, error: error.response });

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
    dispatch({ type: UPDATE_STATUS_ADMIN_REQUEST });
    return axios({
      method: 'POST',
      url: `${BASE_URL}/status/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(
      () => {
        dispatch({ type: UPDATE_STATUS_ADMIN_SUCCESS });
        dispatch(fetchData(params));
      },
      error => {
        dispatch({ type: UPDATE_STATUS_ADMIN_ERROR, error: error.response });
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
    dispatch({ type: DELETE_ADMIN_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${BASE_URL}/id/${id}`
    }).then(
      response => {
        dispatch({ type: DELETE_ADMIN_SUCCESS, payload: response.data });
        dispatch(fetchData(params));
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully deleted record!'
        });
      },
      error => {
        dispatch({ type: DELETE_ADMIN_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Error deleted data!'
        });
      }
    );
  };
}

export const currentData = () => async dispatch => {
  const token = cookies.get('id_token') || null;

  axios.defaults.headers.common.Authorization = `${token}`;
  try {
    const res = await axios.get(`${BASE_URL}/token`);
    dispatch({
      type: FETCH_CURRENT_ADMIN,
      payload: res.data
    });
  } catch (error) {
    if (!error.response) {
      iziToast.error({
        title: 'Error',
        position: 'topCenter',
        message: 'Network Error or Server Error',
        timeout: 6000
      });
    }
    if (error.response && error.response.status === 401) {
      dispatch(logoutUser());
    }
  }
};
