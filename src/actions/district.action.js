import axios from 'axios';
import { Cookies } from 'react-cookie';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';

const cookies = new Cookies();

export const FETCH_DISTRICT_REQUEST = 'FETCH_DISTRICT_REQUEST';
export const FETCH_DISTRICT_SUCCESS = 'FETCH_DISTRICT_SUCCESS';
export const FETCH_DISTRICT_ERROR = 'FETCH_DISTRICT_ERROR';

const BASE_URL = `${URL_API}/district`;

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_DISTRICT_REQUEST, loading: true });
    return axios({
      method: 'get',
      url: `${BASE_URL}`,
      params: data
    })
      .then(
        response => {
          dispatch({ type: FETCH_DISTRICT_SUCCESS, payload: response.data });
        },
        error => {
          dispatch({ type: FETCH_DISTRICT_ERROR, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_DISTRICT_ERROR, error });
        throw error;
      });
  };
}
