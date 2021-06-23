import axios from 'axios';
import { Cookies } from 'react-cookie';
import swal from 'sweetalert2';
import iziToast from 'izitoast';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';

const cookies = new Cookies();

export const FETCH_GROUPCATEGORY_REQUEST = 'FETCH_GROUPCATEGORY_REQUEST';
export const FETCH_GROUPCATEGORY_SUCCESS = 'FETCH_GROUPCATEGORY_SUCCESS';
export const FETCH_GROUPCATEGORY_ERROR = 'FETCH_GROUPCATEGORY_ERROR';

export const DETAIL_GROUPCATEGORY_REQUEST = 'DETAIL_GROUPCATEGORY_REQUEST';
export const DETAIL_GROUPCATEGORY_SUCCESS = 'DETAIL_GROUPCATEGORY_SUCCESS';
export const DETAIL_GROUPCATEGORY_ERROR = 'DETAIL_GROUPCATEGORY_ERROR';

export const CREATE_GROUPCATEGORY_REQUEST = 'CREATE_GROUPCATEGORY_REQUEST';
export const CREATE_GROUPCATEGORY_SUCCESS = 'CREATE_GROUPCATEGORY_SUCCESS';
export const CREATE_GROUPCATEGORY_ERROR = 'CREATE_GROUPCATEGORY_ERROR';

export const UPDATE_GROUPCATEGORY_REQUEST = 'UPDATE_GROUPCATEGORY_REQUEST';
export const UPDATE_GROUPCATEGORY_SUCCESS = 'UPDATE_GROUPCATEGORY_SUCCESS';
export const UPDATE_GROUPCATEGORY_ERROR = 'UPDATE_GROUPCATEGORY_ERROR';

export const UPDATE_STATUS_GROUPCATEGORY_REQUEST =
  'UPDATE_STATUS_GROUPCATEGORY_REQUEST';
export const UPDATE_STATUS_GROUPCATEGORY_SUCCESS =
  'UPDATE_STATUS_GROUPCATEGORY_SUCCESS';
export const UPDATE_STATUS_GROUPCATEGORY_ERROR =
  'UPDATE_STATUS_GROUPCATEGORY_ERROR';

export const DELETE_GROUPCATEGORY_REQUEST = 'DELETE_GROUPCATEGORY_REQUEST';
export const DELETE_GROUPCATEGORY_SUCCESS = 'DELETE_GROUPCATEGORY_SUCCESS';
export const DELETE_GROUPCATEGORY_ERROR = 'DELETE_GROUPCATEGORY_ERROR';

export const FETCH_ALL_GROUPCATEGORY_REQUEST =
  'FETCH_ALL_GROUPCATEGORY_REQUEST';
export const FETCH_ALL_GROUPCATEGORY_SUCCESS =
  'FETCH_ALL_GROUPCATEGORY_SUCCESS';
export const FETCH_ALL_GROUPCATEGORY_ERROR = 'FETCH_ALL_GROUPCATEGORY_ERROR';

const BASE_URL = `${URL_API}/group`;

const REDIRECT_URL = `/master/groupcategory`;

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_GROUPCATEGORY_REQUEST, loading: true });
    // dispatch({ type: FETCH_GROUPCATEGORY_SUCCESS, payload: dummy.user });
    return axios({
      method: 'get',
      url: `${BASE_URL}`,
      params: data
    })
      .then(
        response => {
          dispatch({
            type: FETCH_GROUPCATEGORY_SUCCESS,
            payload: response.data
          });
        },
        error => {
          dispatch({ type: FETCH_GROUPCATEGORY_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_GROUPCATEGORY_ERROR, error });
        throw error;
      });
  };
}

export function detailData(code) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DETAIL_GROUPCATEGORY_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${BASE_URL}/code/${code}`
    }).then(
      response => {
        dispatch({
          type: DETAIL_GROUPCATEGORY_SUCCESS,
          payload: response.data
        });
      },
      error => {
        dispatch({ type: DETAIL_GROUPCATEGORY_ERROR, error: error.response });
      }
    );
  };
}

export function createData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: CREATE_GROUPCATEGORY_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${BASE_URL}`,
      headers: {},
      data
    }).then(
      response => {
        dispatch({
          type: CREATE_GROUPCATEGORY_SUCCESS,
          payload: response.data
        });
        swal.fire('Success!', 'Data created!', 'success').then(() => {
          // window.location.href = REDIRECT_URL;
        });
        return response;
      },
      error => {
        dispatch({ type: CREATE_GROUPCATEGORY_ERROR, error: error.response });
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
    dispatch({ type: UPDATE_GROUPCATEGORY_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${BASE_URL}/id/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(
      response => {
        dispatch({
          type: UPDATE_GROUPCATEGORY_SUCCESS,
          payload: response.data
        });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully updated record!'
        });
        window.location.href = REDIRECT_URL;
      },
      error => {
        dispatch({ type: UPDATE_GROUPCATEGORY_ERROR, error: error.response });
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
    dispatch({ type: UPDATE_STATUS_GROUPCATEGORY_REQUEST });
    return axios({
      method: 'POST',
      url: `${BASE_URL}/status/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(
      () => {
        dispatch({ type: UPDATE_STATUS_GROUPCATEGORY_SUCCESS });
        dispatch(fetchData(params));
      },
      error => {
        dispatch({
          type: UPDATE_STATUS_GROUPCATEGORY_ERROR,
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
    dispatch({ type: DELETE_GROUPCATEGORY_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${BASE_URL}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: DELETE_GROUPCATEGORY_SUCCESS,
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
        dispatch({ type: DELETE_GROUPCATEGORY_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Error deleted data!'
        });
      }
    );
  };
}

export function fetchAllData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_ALL_GROUPCATEGORY_REQUEST, loading: true });
    // dispatch({ type: FETCH_GROUPCATEGORY_SUCCESS, payload: dummy.user });
    return axios({
      method: 'get',
      url: `${BASE_URL}/all`,
      params: data
    })
      .then(
        response => {
          dispatch({
            type: FETCH_ALL_GROUPCATEGORY_SUCCESS,
            payload: response.data
          });
        },
        error => {
          dispatch({
            type: FETCH_ALL_GROUPCATEGORY_ERROR,
            error: error.response
          });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_ALL_GROUPCATEGORY_ERROR, error });
        throw error;
      });
  };
}
