import axios from 'axios';
import { Cookies } from 'react-cookie';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';

const cookies = new Cookies();

export const FETCH_ROLE_REQUEST = 'FETCH_ROLE_REQUEST';
export const FETCH_ROLE_SUCCESS = 'FETCH_ROLE_SUCCESS';
export const FETCH_ROLE_ERROR = 'FETCH_ROLE_ERROR';

const BASE_URL = `${URL_API}/role`;

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_ROLE_REQUEST, loading: true });
    return axios({
      method: 'get',
      url: `${BASE_URL}`,
      params: data
    })
      .then(
        response => {
          dispatch({ type: FETCH_ROLE_SUCCESS, payload: response.data });
        },
        error => {
          dispatch({ type: FETCH_ROLE_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_ROLE_ERROR, error });
        throw error;
      });
  };
}
