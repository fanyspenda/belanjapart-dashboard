import axios from 'axios';
import { Cookies } from 'react-cookie';
import swal from 'sweetalert2';
import iziToast from 'izitoast';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';

const cookies = new Cookies();

export const FETCH_ATRIBUT_REQUEST = 'FETCH_ATRIBUT_REQUEST';
export const FETCH_ATRIBUT_SUCCESS = 'FETCH_ATRIBUT_SUCCESS';
export const FETCH_ATRIBUT_ERROR = 'FETCH_ATRIBUT_ERROR';

export const DETAIL_ATRIBUT_REQUEST = 'DETAIL_ATRIBUT_REQUEST';
export const DETAIL_ATRIBUT_SUCCESS = 'DETAIL_ATRIBUT_SUCCESS';
export const DETAIL_ATRIBUT_ERROR = 'DETAIL_ATRIBUT_ERROR';

export const CREATE_ATRIBUT_REQUEST = 'CREATE_ATRIBUT_REQUEST';
export const CREATE_ATRIBUT_SUCCESS = 'CREATE_ATRIBUT_SUCCESS';
export const CREATE_ATRIBUT_ERROR = 'CREATE_ATRIBUT_ERROR';

export const UPDATE_ATRIBUT_REQUEST = 'UPDATE_ATRIBUT_REQUEST';
export const UPDATE_ATRIBUT_SUCCESS = 'UPDATE_ATRIBUT_SUCCESS';
export const UPDATE_ATRIBUT_ERROR = 'UPDATE_ATRIBUT_ERROR';

export const DELETE_ATRIBUT_REQUEST = 'DELETE_ATRIBUT_REQUEST';
export const DELETE_ATRIBUT_SUCCESS = 'DELETE_ATRIBUT_SUCCESS';
export const DELETE_ATRIBUT_ERROR = 'DELETE_ATRIBUT_ERROR';

export const FETCH_ALL_ATRIBUT_REQUEST = 'FETCH_ALL_ATRIBUT_REQUEST';
export const FETCH_ALL_ATRIBUT_SUCCESS = 'FETCH_ALL_ATRIBUT_SUCCESS';
export const FETCH_ALL_ATRIBUT_ERROR = 'FETCH_ALL_ATRIBUT_ERROR';

const URL_PATH = `${URL_API}/attribute`;

const REDIRECT_URL = `/master/atribut`;

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_ATRIBUT_REQUEST, loading: true });
    return axios({
      method: 'get',
      url: `${URL_PATH}`,
      params: data
    })
      .then(
        response => {
          dispatch({ type: FETCH_ATRIBUT_SUCCESS, payload: response.data });
        },
        error => {
          dispatch({ type: FETCH_ATRIBUT_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_ATRIBUT_ERROR, error });
        throw error;
      });
  };
}

export function detailData(id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DETAIL_ATRIBUT_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${URL_PATH}/id/${id}`
    }).then(
      response => {
        dispatch({ type: DETAIL_ATRIBUT_SUCCESS, payload: response.data });
      },
      error => {
        dispatch({ type: DETAIL_ATRIBUT_ERROR, error: error.response });
      }
    );
  };
}

export function createData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: CREATE_ATRIBUT_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${URL_PATH}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(
      response => {
        dispatch({
          type: CREATE_ATRIBUT_SUCCESS,
          payload: response.data
        });
        swal.fire('Success!', 'Data created!', 'success').then(() => {
          // window.location.href = REDIRECT_URL;
        });
        return response;
      },
      error => {
        dispatch({ type: CREATE_ATRIBUT_ERROR, error: error.response });
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
    dispatch({ type: UPDATE_ATRIBUT_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${URL_PATH}/id/${id}`,
      headers: {},
      data
    }).then(
      response => {
        dispatch({
          type: UPDATE_ATRIBUT_SUCCESS,
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
        dispatch({ type: UPDATE_ATRIBUT_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: error
        });
        throw error;
      }
    );
  };
}

export function deleteData(id, params) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DELETE_ATRIBUT_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${URL_PATH}/id/${id}`
    }).then(
      response =>
        new Promise((resolve, reject) => {
          dispatch({
            type: DELETE_ATRIBUT_SUCCESS,
            payload: response.data
          });
          dispatch(fetchData(params));

          resolve(
            iziToast.success({
              title: 'Success',
              position: 'topRight',
              message: 'Successfully deleted record!'
            })
          );
        }),
      error => {
        dispatch({ type: DELETE_ATRIBUT_ERROR, error: error.response });
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
    dispatch({ type: FETCH_ALL_ATRIBUT_REQUEST, loading: true });
    return axios({
      method: 'get',
      url: `${URL_PATH}/all`,
      params: data
    })
      .then(
        response => {
          dispatch({ type: FETCH_ALL_ATRIBUT_SUCCESS, payload: response.data });
        },
        error => {
          dispatch({ type: FETCH_ALL_ATRIBUT_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_ALL_ATRIBUT_ERROR, error });
        throw error;
      });
  };
}
