import axios from 'axios';
import { Cookies } from 'react-cookie';
import iziToast from 'izitoast';
import swal from 'sweetalert2';
import {
  fetchData as fetchProduct,
  detailData as detailProduct
} from '@actions/product.action';
import { fetchData as fetchCategory } from '@actions/category.action';
import { fetchData as fetchAttribute } from '@actions/atribut.action';
import { fetchData as fetchGroup } from '@actions/groupcategory.action';
import httpService from '../services/http.service';
import { URL_API } from '../config/keys';
import { logoutUser } from './auth.action';

const cookies = new Cookies();

export const CREATE_PICTURE_REQUEST = 'CREATE_PICTURE_REQUEST';
export const CREATE_PICTURE_PROGRESS = 'CREATE_PICTURE_PROGRESS';
export const CREATE_PICTURE_SUCCESS = 'CREATE_PICTURE_SUCCESS';
export const CREATE_PICTURE_ERROR = 'CREATE_PICTURE_ERROR';

export const CREATE_PICTURE_BULK_REQUEST = 'CREATE_PICTURE_BULK_REQUEST';
export const CREATE_PICTURE_BULK_PROGRESS = 'CREATE_PICTURE_BULK_PROGRESS';
export const CREATE_PICTURE_BULK_SUCCESS = 'CREATE_PICTURE_BULK_SUCCESS';
export const CREATE_PICTURE_BULK_ERROR = 'CREATE_PICTURE_BULK_ERROR';

export const FETCH_PICTURE_REQUEST = 'FETCH_PICTURE_REQUEST';
export const FETCH_PICTURE_SUCCESS = 'FETCH_PICTURE_SUCCESS';
export const FETCH_PICTURE_ERROR = 'FETCH_PICTURE_ERROR';

export const DELETE_PICTURE_REQUEST = 'DELETE_PICTURE_REQUEST';
export const DELETE_PICTURE_SUCCESS = 'DELETE_PICTURE_SUCCESS';
export const DELETE_PICTURE_ERROR = 'DELETE_PICTURE_ERROR';

export const COMBINE_PICTURE_SUCCESS = 'COMBINE_PICTURE_SUCCESS';
export const NULL_PICTURE_SUCCESS = 'NULL_PICTURE_SUCCESS';
export const NULL_PROGRESS_SUCCESS = 'NULL_PROGRESS_SUCCESS';

export const CREATE_FILE_REQUEST = 'CREATE_FILE_REQUEST';
export const CREATE_FILE_PROGRESS = 'CREATE_FILE_PROGRESS';
export const CREATE_FILE_SUCCESS = 'CREATE_FILE_SUCCESS';
export const CREATE_FILE_ERROR = 'CREATE_FILE_ERROR';

export const EXPORT_CSV_REQUEST = 'EXPORT_CSV_REQUEST';
export const EXPORT_CSV_SUCCESS = 'EXPORT_CSV_SUCCESS';
export const EXPORT_CSV_ERROR = 'EXPORT_CSV_ERROR';

export const NULL_FILE_SUCCESS = 'NULL_FILE_SUCCESS';

const URL_PATH = `${URL_API}/picture`;
const URL_IMPORT = `${URL_API}/import`;

const REDIRECT_URL = `/master/product`;

export function combinePictures(picture) {
  return dispatch =>
    dispatch({ type: COMBINE_PICTURE_SUCCESS, payload: picture });
}

export function nullPicture() {
  return dispatch => dispatch({ type: NULL_PICTURE_SUCCESS });
}

export function nullFile() {
  return dispatch => dispatch({ type: NULL_FILE_SUCCESS });
}

export function nullProgress() {
  return dispatch => dispatch({ type: NULL_PROGRESS_SUCCESS });
}

export function fetchData(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: FETCH_PICTURE_REQUEST, loading: true });
    return axios({
      method: 'get',
      url: `${URL_PATH}`,
      params: data
    })
      .then(
        response => {
          dispatch({ type: FETCH_PICTURE_SUCCESS, payload: response.data });
        },
        error => {
          dispatch({ type: FETCH_PICTURE_SUCCESS, error: error.response });
          if (error.response.status === 401) {
            dispatch(logoutUser());
          }
        }
      )
      .catch(error => {
        dispatch({ type: FETCH_PICTURE_ERROR, error });
        throw error;
      });
  };
}

export function createPicture(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: CREATE_PICTURE_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: URL_PATH,
      headers: { 'Content-Type': 'multipart/form-data' },
      data,
      onUploadProgress: evt => {
        if (evt.loaded && evt.total) {
          const progress = Math.round((evt.loaded * 100) / evt.total);
          // console.log('progress', progress);
          dispatch({
            type: CREATE_PICTURE_PROGRESS,
            payload: progress
          });
        }
      }
    }).then(
      response => {
        dispatch({
          type: CREATE_PICTURE_SUCCESS,
          payload: response.data
        });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully inserted picture!'
        });
        return response;
      },
      error => {
        dispatch({ type: CREATE_PICTURE_ERROR, error: error.response });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.stat_msg
        });
        throw error;
      }
    );
  };
}

export function deleteData(id) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: DELETE_PICTURE_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${URL_PATH}/id/${id}`
    }).then(
      response => {
        dispatch({ type: DELETE_PICTURE_SUCCESS, payload: response.data });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully deleted picture!'
        });
      },
      error => {
        dispatch({ type: DELETE_PICTURE_ERROR, error: error.response });

        if (error.response.status === 400) {
          return iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: 'Image not found on server'
          });
        }

        return iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Error while deleting data!'
        });
      }
    );
  };
}

const handleMessageError = val => {
  const temp = [];
  val &&
    val.length > 0 &&
    val.map(x => {
      const tempMessage = Object.entries(x).join(' ');
      temp.push(tempMessage.replace(/,/g, ' '));
    });

  return temp || val;
};

export function uploadFile(data, path = '', futurePage, code) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: CREATE_FILE_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${URL_IMPORT}/${path}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data,
      onUploadProgress: evt => {
        if (evt.loaded && evt.total) {
          const progress = Math.round((evt.loaded * 100) / evt.total);
          dispatch({
            type: CREATE_FILE_PROGRESS,
            payload: progress
          });
        }
      }
    })
      .then(
        response => {
          dispatch({
            type: CREATE_FILE_SUCCESS,
            payload: response.data
          });
          const { data } = response.data;
          const params = {
            page: futurePage,
            sort: 'asc',
            by: 'createdAt',
            status: 'true',
            limit: '10'
          };
          if (data.fail) {
            iziToast.warning({
              title: 'Warning',
              position: 'topRight',
              message: `With ${data.messages} line fail`
            });
          } else {
            swal.fire('Success!', 'Data created!', 'success');
            if (path === 'product') {
              const ext = {
                parent_id: '',
                group_id: '',
                category_id: ''
              };
              dispatch(fetchProduct(Object.assign(params, ext)));
            } else if (path === 'category') {
              params.page = 1;
              delete params.sort;
              delete params.by;
              dispatch(fetchCategory(params));
            } else if (path === 'attribute') {
              delete params.sort;
              delete params.by;
              dispatch(fetchAttribute(params));
            } else if (path === 'group') {
              delete params.sort;
              delete params.by;
              dispatch(fetchGroup(params));
            }
          }
          return response;
        },
        error => {
          if (error.response.status >= 500) {
            throw error.response.data;
          } else {
            dispatch({ type: CREATE_FILE_ERROR, error: error.response });
            iziToast.error({
              title: 'Error',
              position: 'topRight',
              message:
                error.response.data.stat_msg === 'Something Wrong Sir' ||
                error.response.data.stat_msg === 'excel_data'
                  ? error.response.data.data.messages ||
                    handleMessageError(error.response.data.data.error)
                  : error.response.data.stat_msg
            });
            throw error;
          }
        }
      )
      .catch(error => {
        dispatch({ type: CREATE_FILE_ERROR, error });
        throw error;
      });
  };
}

export function createPictureBulk(data) {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;

  return dispatch => {
    dispatch({ type: CREATE_PICTURE_BULK_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${URL_PATH}/bulk`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data,
      onUploadProgress: evt => {
        if (evt.loaded && evt.total) {
          const progress = Math.round((evt.loaded * 100) / evt.total);
          // console.log('progress', progress);
          dispatch({
            type: CREATE_PICTURE_BULK_PROGRESS,
            payload: progress
          });
        }
      }
    }).then(
      response => {
        dispatch({
          type: CREATE_PICTURE_BULK_SUCCESS,
          payload: response.data
        });
        iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: 'Successfully inserted picture!'
        });
        return response;
      },
      error => {
        dispatch({ type: CREATE_PICTURE_BULK_ERROR, error: error.response });
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

export function exportCsv(path, code) {
  const params = { product_code: '' };
  if (code) {
    params.product_code = code;

    return dispatch => {
      dispatch({ type: EXPORT_CSV_REQUEST, loading: true });
      return httpService.get(`/export/${path}`, { params }).then(
        response => {
          dispatch({ type: EXPORT_CSV_SUCCESS, payload: response.data });
          return response;
        },
        error => {
          dispatch({ type: EXPORT_CSV_ERROR, error: error.response });
        }
      );
    };
  }
  if (path === 'secondary_product') {
    return dispatch => {
      dispatch({ type: EXPORT_CSV_REQUEST, loading: true });
      return httpService.get(`/export/${path}`).then(
        response => {
          dispatch({ type: EXPORT_CSV_SUCCESS, payload: response.data });
          return response;
        },
        error => {
          dispatch({ type: EXPORT_CSV_ERROR, error: error.response });
        }
      );
    };
  }

  return dispatch => {
    dispatch({ type: EXPORT_CSV_REQUEST, loading: true });
    return httpService.post(`/export/${path}`).then(
      response => {
        dispatch({ type: EXPORT_CSV_SUCCESS, payload: response.data });
        return response;
      },
      error => {
        dispatch({ type: EXPORT_CSV_ERROR, error: error.response });
      }
    );
  };
}

