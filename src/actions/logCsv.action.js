import httpService from '../services/http.service';

export const FETCH_LOG_CSV_REQUEST = 'FETCH_LOG_CSV_REQUEST';
export const FETCH_LOG_CSV_SUCCESS = 'FETCH_LOG_CSV_SUCCESS';
export const FETCH_LOG_CSV_ERROR = 'FETCH_LOG_CSV_ERROR';

export function fetchData(params) {
  return dispatch => {
    dispatch({ type: FETCH_LOG_CSV_REQUEST, loading: true });
    return httpService.get(`/log_csv`, { params }).then(
      response => {
        dispatch({ type: FETCH_LOG_CSV_SUCCESS, payload: response.data });
        return response;
      },
      error => {
        dispatch({ type: FETCH_LOG_CSV_ERROR, error: error.response });
      }
    );
  };
}
