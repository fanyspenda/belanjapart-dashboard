import axios from 'axios';
import { Cookies } from 'react-cookie';
import iziToast from 'izitoast';
import swal from 'sweetalert2';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';
import { detailData } from './product.action';

const cookies = new Cookies();

export const FETCH_SECONDARY_PRODUCT_REQUEST =
  'FETCH_SECONDARY_PRODUCT_REQUEST';
export const FETCH_SECONDARY_PRODUCT_SUCCESS =
  'FETCH_SECONDARY_PRODUCT_SUCCESS';
export const FETCH_SECONDARY_PRODUCT_ERROR = 'FETCH_SECONDARY_PRODUCT_ERROR';

export const DETAIL_SECONDARY_PRODUCT_REQUEST =
  'DETAIL_SECONDARY_PRODUCT_REQUEST';
export const DETAIL_SECONDARY_PRODUCT_SUCCESS =
  'DETAIL_SECONDARY_PRODUCT_SUCCESS';
export const DETAIL_SECONDARY_PRODUCT_ERROR = 'DETAIL_SECONDARY_PRODUCT_ERROR';

export const CREATE_SECONDARY_PRODUCT_REQUEST =
  'CREATE_SECONDARY_PRODUCT_REQUEST';
export const CREATE_SECONDARY_PRODUCT_SUCCESS =
  'CREATE_SECONDARY_PRODUCT_SUCCESS';
export const CREATE_SECONDARY_PRODUCT_ERROR = 'CREATE_SECONDARY_PRODUCT_ERROR';

export const UPDATE_SECONDARY_PRODUCT_REQUEST =
  'UPDATE_SECONDARY_PRODUCT_REQUEST';
export const UPDATE_SECONDARY_PRODUCT_SUCCESS =
  'UPDATE_SECONDARY_PRODUCT_SUCCESS';
export const UPDATE_SECONDARY_PRODUCT_ERROR = 'UPDATE_SECONDARY_PRODUCT_ERROR';

export const UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST =
  'UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST';
export const UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS =
  'UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS';
export const UPDATE_STATUS_SECONDARY_PRODUCT_ERROR =
  'UPDATE_STATUS_SECONDARY_PRODUCT_ERROR';

export const DELETE_SECONDARY_PRODUCT_REQUEST =
  'DELETE_SECONDARY_PRODUCT_REQUEST';
export const DELETE_SECONDARY_PRODUCT_SUCCESS =
  'DELETE_SECONDARY_PRODUCT_SUCCESS';
export const DELETE_SECONDARY_PRODUCT_ERROR = 'DELETE_SECONDARY_PRODUCT_ERROR';

export const DELETE_ALL_SECONDARY_PRODUCT_REQUEST =
  'DELETE_ALL_SECONDARY_PRODUCT_REQUEST';
export const DELETE_ALL_SECONDARY_PRODUCT_SUCCESS =
  'DELETE_ALL_SECONDARY_PRODUCT_SUCCESS';
export const DELETE_ALL_SECONDARY_PRODUCT_ERROR =
  'DELETE_ALL_SECONDARY_PRODUCT_ERROR';

export const OPEN_SECONDARY_PRODUCT_MODAL = 'OPEN_SECONDARY_PRODUCT_MODAL';

const BASE_URL = `${URL_API}/secondary_product`;

const REDIRECT_URL = `/master/product`;

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_SECONDARY_PRODUCT_REQUEST, loading: true });
    // dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: dummy.user });
    return axios({
      method: 'get',
      url: `${BASE_URL}`,
      params: data
    })
      .then(
        response => {
          dispatch({
            type: FETCH_SECONDARY_PRODUCT_SUCCESS,
            payload: response.data
          });
        },
        error => {
          dispatch({
            type: FETCH_SECONDARY_PRODUCT_ERROR,
            error: error.response
          });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_SECONDARY_PRODUCT_ERROR, error });
        throw error;
      });
  };
}

export function detailSecondary(id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DETAIL_SECONDARY_PRODUCT_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${BASE_URL}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: DETAIL_SECONDARY_PRODUCT_SUCCESS,
          payload: response.data
        });
      },
      error => {
        dispatch({
          type: DETAIL_SECONDARY_PRODUCT_ERROR,
          error: error.response
        });
      }
    );
  };
}

export function createData(data, code) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: CREATE_SECONDARY_PRODUCT_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${BASE_URL}`,
      headers: {},
      data
    }).then(
      response => {
        dispatch({
          type: CREATE_SECONDARY_PRODUCT_SUCCESS,
          payload: response.data
        });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully Data created!'
        });
        dispatch(detailData(code));
        // window.location.href = REDIRECT_URL;
        // swal.fire('Success!', 'Data created!', 'success').then(() => {
        //   window.location.href = REDIRECT_URL;
        // });
      },
      error => {
        dispatch({
          type: CREATE_SECONDARY_PRODUCT_ERROR,
          error: error.response
        });
        if (error.response.status === 400) {
          iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: error.response.data.stat_msg
          });
        } else if (error.response.status === 401) {
          dispatch(logoutUser());
        } else {
          iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: error.response.data.stat_msg
          });
        }
      }
    );
  };
}

export function updateSecondary(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_SECONDARY_PRODUCT_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${BASE_URL}`,
      headers: {},
      data
    }).then(
      response => {
        dispatch({
          type: UPDATE_SECONDARY_PRODUCT_SUCCESS,
          payload: response.data
        });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Invalid input Secondary Product'
        });
        window.location.href = REDIRECT_URL;
      },
      error => {
        dispatch({
          type: UPDATE_SECONDARY_PRODUCT_ERROR,
          error: error.response
        });
        if (error.response.status === 400) {
          iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: 'Invalid input Secondary Product'
          });
        } else if (error.response.status === 401) {
          dispatch(logoutUser());
        } else {
          iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: error.response.data.stat_msg
          });
        }
      }
    );
  };
}

export function updateStatusData(data, id, params) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST });
    return axios({
      method: 'POST',
      url: `${BASE_URL}/status/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(
      () => {
        dispatch({ type: UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS });
        dispatch(fetchData(params));
      },
      error => {
        dispatch({
          type: UPDATE_STATUS_SECONDARY_PRODUCT_ERROR,
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

export function deleteData(id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DELETE_SECONDARY_PRODUCT_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${BASE_URL}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: DELETE_SECONDARY_PRODUCT_SUCCESS,
          payload: response.data
        });
        dispatch(fetchData({ page: 1, limit: 10, status: true }));
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully deleted record!'
        });
      },
      error => {
        dispatch({
          type: DELETE_SECONDARY_PRODUCT_ERROR,
          error: error.response
        });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Error deleted data!'
        });
      }
    );
  };
}

export function openModal(id) {
  return dispatch => {
    dispatch({ type: OPEN_SECONDARY_PRODUCT_MODAL, payload: id });
  };
}

export function deleteAll(id, code) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: DELETE_ALL_SECONDARY_PRODUCT_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${BASE_URL}/productID/${id}`
    }).then(
      response => {
        dispatch({
          type: DELETE_ALL_SECONDARY_PRODUCT_SUCCESS,
          payload: response.data
        });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully delete record!'
        });
        if (!code) {
          dispatch(fetchData({ page: 1, limit: 10, status: true }));
          window.location.href = REDIRECT_URL;
          return false;
        }
        console.log('jancok');
        return true;
      },
      error => {
        dispatch({
          type: DELETE_ALL_SECONDARY_PRODUCT_ERROR,
          error: error.response
        });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Error deleted data!'
        });
      }
    );
  };
}

export const SET_CURRENT_SECONDARY = 'SET_CURRENT_SECONDARY';

export function setCurrentSecondary(current) {
  return dispatch => {
    dispatch({ type: SET_CURRENT_SECONDARY, payload: current });
  };
}
