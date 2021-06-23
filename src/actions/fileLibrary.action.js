import iziToast from 'izitoast';
import httpService from '../services/http.service';

export const FETCH_FILE_REQUEST = 'FETCH_FILE_REQUEST';
export const FETCH_FILE_SUCCESS = 'FETCH_FILE_SUCCESS';
export const FETCH_FILE_ERROR = 'FETCH_FILE_ERROR';

export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_PROGRESS = 'UPLOAD_FILE_PROGRESS';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_ERROR = 'UPLOAD_FILE_ERROR';

export const NULL_FILE_LIBRARY_SUCCESS = 'NULL_FILE_LIBRARY_SUCCESS';

export function fetchData(params) {
  return dispatch => {
    dispatch({ type: FETCH_FILE_REQUEST, loading: true });
    return httpService.get(`/file_pdf`, { params }).then(
      response => {
        dispatch({ type: FETCH_FILE_SUCCESS, payload: response.data || [] });
        return response;
      },
      error => {
        dispatch({ type: FETCH_FILE_ERROR, error: error.response });
      }
    );
  };
}

export function uploadBulk(data) {
  return dispatch => {
    dispatch({ type: UPLOAD_FILE_REQUEST, loading: true });
    return httpService
      .post(`/file_pdf/bulk`, data, {
        onUploadProgress: evt => {
          if (evt.loaded && evt.total) {
            const progress = Math.round((evt.loaded * 100) / evt.total);
            dispatch({
              type: UPLOAD_FILE_PROGRESS,
              payload: progress
            });
          }
        }
      })
      .then(
        response => {
          dispatch({
            type: UPLOAD_FILE_SUCCESS,
            payload: response.data
          });
          dispatch(fetchData({ limit: 21, page: 1 }));
          iziToast.success({
            title: 'Success',
            position: 'topRight',
            message: 'Successfully inserted picture!'
          });
          return response;
        },
        error => {
          dispatch({ type: UPLOAD_FILE_ERROR, error: error.response });
          iziToast.error({
            title: 'Error',
            position: 'topRight',
            message:
              error.response.data.stat_msg === 'Something Wrong Sir'
                ? error.response.data.data.messages
                : error.response.data.stat_msg
          });
          throw error;
        }
      );
  };
}

export function nullPicture() {
  return dispatch => dispatch({ type: NULL_FILE_LIBRARY_SUCCESS });
}
