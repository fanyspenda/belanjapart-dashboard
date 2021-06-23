import axios from 'axios';
import { Cookies } from 'react-cookie';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';

const cookies = new Cookies();

export const FETCH_PROVINCE_REQUEST = 'FETCH_PROVINCE_REQUEST';
export const FETCH_PROVINCE_SUCCESS = 'FETCH_PROVINCE_SUCCESS';
export const FETCH_PROVINCE_ERROR = 'FETCH_PROVINCE_ERROR';

export const FETCH_PROVINCE_CITY_REQUEST = 'FETCH_PROVINCE_CITY_REQUEST';
export const FETCH_PROVINCE_CITY_SUCCESS = 'FETCH_PROVINCE_CITY_SUCCESS';
export const FETCH_PROVINCE_CITY_ERROR = 'FETCH_PROVINCE_CITY_ERROR';

const BASE_URL = `${URL_API}/province`;

export function fetchProvince(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_PROVINCE_REQUEST, loading: true });
    return axios({
      method: 'get',
      url: `${BASE_URL}`,
      params: data
    })
      .then(
        response => {
          // console.log('bippp', response);
          dispatch({ type: FETCH_PROVINCE_SUCCESS, payload: response.data });
        },
        error => {
          dispatch({ type: FETCH_PROVINCE_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_PROVINCE_ERROR, error });
        throw error;
      });
  };
}

export function fetchProvByProvId(id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_PROVINCE_CITY_REQUEST, loading: true });
    return axios({
      method: 'get',
      url: `${BASE_URL}/id/${id}`
    })
      .then(
        response => {
          // console.log('bippp2', response);
          dispatch({
            type: FETCH_PROVINCE_CITY_SUCCESS,
            payload: response.data
          });
        },
        error => {
          dispatch({ type: FETCH_PROVINCE_CITY_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_PROVINCE_CITY_ERROR, error });
        throw error;
      });
  };
}
