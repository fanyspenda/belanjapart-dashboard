import axios from 'axios';
import { Cookies } from 'react-cookie';
import iziToast from 'izitoast';
import { URL_API, URL_WEB_FRONT } from '../config/keys';
import { notification } from '../../public/socket/socket';

const cookies = new Cookies();

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const NEW_PASSWORD_REQUEST = 'NEW_PASSWORD_REQUEST';
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS';
export const NEW_PASSWORD_FAILURE = 'NEW_PASSWORD_FAILURE';

const BASE_URL = `${URL_API}/admin`;

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: data.token
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

function requestForgotPassword() {
  return {
    type: FORGOT_PASSWORD_REQUEST
  };
}

function forgotPasswordSuccess() {
  return {
    type: FORGOT_PASSWORD_SUCCESS
  };
}

function forgotPasswordError(message) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    message
  };
}

function requestNewPass() {
  return {
    type: NEW_PASSWORD_REQUEST
  };
}

function newPassSuccess() {
  return {
    type: NEW_PASSWORD_SUCCESS
  };
}

function newPassError(message) {
  return {
    type: NEW_PASSWORD_FAILURE,
    message
  };
}

export function loginUser(data) {
  const b = new Buffer('mcmaster' + ':' + 'mcmaster11112222');
  const basicAuth = b.toString('base64');
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Basic ${basicAuth}`
  };
  return dispatch => {
    dispatch(requestLogin(data));
    return axios.post(`${URL_API}/admin/login`, data, { headers }).then(
      response => {
        cookies.set('id_token', `Bearer ${response.data.data.token}`, {
          path: '/'
        });
        dispatch(receiveLogin(response.data));
      },
      error => {
        dispatch(loginError(error.response.data.stat_msg));
      }
    );
  };
}

export function forgotPassword(data) {
  const b = new Buffer('mcmaster' + ':' + 'mcmaster11112222');
  const basicAuth = b.toString('base64');
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Basic ${basicAuth}`
  };
  return dispatch => {
    dispatch(requestForgotPassword());
    return axios
      .post(`${URL_WEB_FRONT}/user/forgotPasswordRequest`, data, { headers })
      .then(
        response => {
          dispatch(forgotPasswordSuccess(response));
          iziToast.success({
            title: 'Success',
            position: 'topRight',
            message:
              'Successfully request reset password! Dont forget to check your email'
          });
        },
        error => {
          dispatch(forgotPasswordError(error.response.data.message));
        }
      );
  };
}

export function newPassword(data) {
  const b = new Buffer('mcmaster' + ':' + 'mcmaster11112222');
  const basicAuth = b.toString('base64');
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Basic ${basicAuth}`
  };
  return dispatch => {
    dispatch(requestNewPass(data));
    return axios
      .post(`${URL_WEB_FRONT}/user/forgotPassword`, data, { headers })
      .then(
        response => {
          dispatch(newPassSuccess());
          iziToast.success({
            title: 'Success',
            position: 'topRight',
            message: 'Successfully reset password!'
          });
          window.location.href = '/login';
        },
        error => {
          iziToast.error({
            title: 'Error',
            message: error.response.data.message,
            position: 'bottomRight'
          });
          dispatch(newPassError(error.response.data.message));
        }
      );
  };
}

export function logoutUser(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch(requestLogout());
    // dispatch({ type: FETCH_ADMIN_SUCCESS, payload: dummy.user });
    return axios({
      method: 'POST',
      url: `${BASE_URL}/logout`
    })
      .then(
        response => {
          cookies.remove('id_token', { path: '/' });
          cookies.remove('id_role', { path: '/' });
          dispatch(receiveLogout());
        },
        error => {
          dispatch({ type: LOGOUT_FAILURE, error: error.response });
          if (error.response.status === 401) {
            cookies.remove('id_token', { path: '/' });
            cookies.remove('id_role', { path: '/' });
            window.location.href = '/login';
          }
        }
      )
      .catch(error => {
        dispatch({ type: LOGOUT_FAILURE, error });
        throw error;
      });
  };
}

// Logs the user out
