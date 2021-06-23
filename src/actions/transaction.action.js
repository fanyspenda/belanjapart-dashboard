import axios from 'axios';
import { Cookies } from 'react-cookie';
import iziToast from 'izitoast';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';
import httpService from '../services/http.service';

const cookies = new Cookies();

export const FETCH_TRANSACTION_REQUEST = 'FETCH_TRANSACTION_REQUEST';
export const FETCH_TRANSACTION_SUCCESS = 'FETCH_TRANSACTION_SUCCESS';
export const FETCH_TRANSACTION_ERROR = 'FETCH_TRANSACTION_ERROR';

export const DETAIL_TRANSACTION_REQUEST = 'DETAIL_TRANSACTION_REQUEST';
export const DETAIL_TRANSACTION_SUCCESS = 'DETAIL_TRANSACTION_SUCCESS';
export const DETAIL_TRANSACTION_ERROR = 'DETAIL_TRANSACTION_ERROR';

export const UPDATE_STATUS_TRANSACTION_REQUEST =
  'UPDATE_STATUS_TRANSACTION_REQUEST';
export const UPDATE_STATUS_TRANSACTION_SUCCESS =
  'UPDATE_STATUS_TRANSACTION_SUCCESS';
export const UPDATE_STATUS_TRANSACTION_ERROR =
  'UPDATE_STATUS_TRANSACTION_ERROR';

export const DELETE_TRANSACTION_REQUEST = 'DELETE_TRANSACTION_REQUEST';
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
export const DELETE_TRANSACTION_ERROR = 'DELETE_TRANSACTION_ERROR';

export const ADD_TRACKING_NUMBER_REQUEST = 'ADD_TRACKING_NUMBER_REQUEST';
export const ADD_TRACKING_NUMBER_SUCCESS = 'ADD_TRACKING_NUMBER_SUCCESS';
export const ADD_TRACKING_NUMBER_ERROR = 'ADD_TRACKING_NUMBER_ERROR';

const URL_PATH = `${URL_API}/transaction`;

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_TRANSACTION_REQUEST, loading: true });
    return axios({
      method: 'get',
      url: `${URL_PATH}`,
      params: data
    })
      .then(
        response => {
          dispatch({ type: FETCH_TRANSACTION_SUCCESS, payload: response.data });
        },
        error => {
          dispatch({ type: FETCH_TRANSACTION_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_TRANSACTION_ERROR, error });
        throw error;
      });
  };
}

export function detailData(id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DETAIL_TRANSACTION_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${URL_PATH}/id/${id}`
    }).then(
      response => {
        dispatch({ type: DETAIL_TRANSACTION_SUCCESS, payload: response.data });
      },
      error => {
        dispatch({ type: DETAIL_TRANSACTION_ERROR, error: error.response });
      }
    );
  };
}

export function updateStatusData(id, data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_STATUS_TRANSACTION_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${URL_PATH}/status/id/${id}`,
      data
    })
      .then(
        response => {
          iziToast.success({
            title: 'Success',
            position: 'topRight',
            message: 'Successfully update status!'
          });
          dispatch({
            type: UPDATE_STATUS_TRANSACTION_SUCCESS,
            payload: response.data
          });
          dispatch(detailData(id));
        },
        error => {
          dispatch({
            type: UPDATE_STATUS_TRANSACTION_ERROR,
            error: error.response
          });
          iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: error.response.data.stat_msg
          });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: UPDATE_STATUS_TRANSACTION_ERROR, error });
        throw error;
      });
  };
}

export function deleteData(id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DELETE_TRANSACTION_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${URL_PATH}/id/${id}`
    }).then(
      response =>
        new Promise((resolve, reject) => {
          dispatch({
            type: DELETE_TRANSACTION_SUCCESS,
            payload: response.data
          });
          dispatch(fetchData({ page: 1, limit: 10, status: true }));

          resolve(
            iziToast.success({
              title: 'Success',
              position: 'topRight',
              message: 'Successfully deleted record!'
            })
          );
        }),
      error => {
        dispatch({ type: DELETE_TRANSACTION_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Error deleted data!'
        });
      }
    );
  };
}

export function addTrackingNumber(id, data) {
  return dispatch => {
    dispatch({ type: ADD_TRACKING_NUMBER_REQUEST, loading: true });
    return httpService.put(`/transaction/tracking_number/id/${id}`, data).then(
      response => {
        dispatch({ type: ADD_TRACKING_NUMBER_SUCCESS, payload: response.data });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully add tracking number!'
        });
        return response;
      },
      error => {
        dispatch({ type: ADD_TRACKING_NUMBER_ERROR, error: error.response });
      }
    );
  };
}
