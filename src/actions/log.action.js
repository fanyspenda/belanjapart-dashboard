import httpService from '../services/http.service';

export const FETCH_LOG_REQUEST = 'FETCH_LOG_REQUEST';
export const FETCH_LOG_SUCCESS = 'FETCH_LOG_SUCCESS';
export const FETCH_LOG_ERROR = 'FETCH_LOG_ERROR';

export const READ_LOG_REQUEST = 'READ_LOG_REQUEST';
export const READ_LOG_SUCCESS = 'READ_LOG_SUCCESS';
export const READ_LOG_ERROR = 'READ_LOG_ERROR';

export function fetchAllData() {
  return dispatch => {
    dispatch({ type: FETCH_LOG_REQUEST, loading: true });
    return httpService.get(`/log/read`).then(
      response => {
        dispatch({ type: FETCH_LOG_SUCCESS, payload: response.data });
        return response;
      },
      error => {
        dispatch({ type: FETCH_LOG_ERROR, error: error.response });
      }
    );
  };
}

export function readData(data) {
  return dispatch => {
    dispatch({ type: READ_LOG_REQUEST, loading: true });
    return httpService.post(`/log/read`, data).then(
      response => {
        dispatch({ type: READ_LOG_SUCCESS, payload: response.data });
        return response;
      },
      error => {
        dispatch({ type: READ_LOG_ERROR, error: error.response });
      }
    );
  };
}
