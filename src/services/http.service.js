/* eslint-disable no-param-reassign */
import Axios from 'axios';
import { Cookies } from 'react-cookie';
import iziToast from 'izitoast';
import { logoutUser } from '@actions/auth.action';
import { URL_API } from '../config/keys';

const cookies = new Cookies();

const httpService = Axios.create({
  baseURL: URL_API,
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
});

httpService.interceptors.request.use(
  config => {
    const token = cookies.get('id_token') || null;

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  error => Promise.reject(error)
);

httpService.interceptors.response.use(
  async res => {
    return res;
  },
  async error => {
    if (error.response.status === 401) {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: error.response.data.stat_msg
      });
      return dispatch => dispatch(logoutUser());
    }
    if (error.response.status >= 500) {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: 'something error with server'
      });
    } else {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: error.response.data.data.messages || error.response.data.stat_msg
      });
    }
    Promise.reject(error);
  }
);

export default httpService;
