"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combinePictures = combinePictures;
exports.nullPicture = nullPicture;
exports.nullFile = nullFile;
exports.nullProgress = nullProgress;
exports.fetchData = fetchData;
exports.createPicture = createPicture;
exports.deleteData = deleteData;
exports.uploadFile = uploadFile;
exports.createPictureBulk = createPictureBulk;
exports.NULL_FILE_SUCCESS = exports.CREATE_FILE_ERROR = exports.CREATE_FILE_SUCCESS = exports.CREATE_FILE_PROGRESS = exports.CREATE_FILE_REQUEST = exports.NULL_PROGRESS_SUCCESS = exports.NULL_PICTURE_SUCCESS = exports.COMBINE_PICTURE_SUCCESS = exports.DELETE_PICTURE_ERROR = exports.DELETE_PICTURE_SUCCESS = exports.DELETE_PICTURE_REQUEST = exports.FETCH_PICTURE_ERROR = exports.FETCH_PICTURE_SUCCESS = exports.FETCH_PICTURE_REQUEST = exports.CREATE_PICTURE_BULK_ERROR = exports.CREATE_PICTURE_BULK_SUCCESS = exports.CREATE_PICTURE_BULK_PROGRESS = exports.CREATE_PICTURE_BULK_REQUEST = exports.CREATE_PICTURE_ERROR = exports.CREATE_PICTURE_SUCCESS = exports.CREATE_PICTURE_PROGRESS = exports.CREATE_PICTURE_REQUEST = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _reactCookie = require("react-cookie");

var _izitoast = _interopRequireDefault(require("izitoast"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _product = require("@actions/product.action");

var _category = require("@actions/category.action");

var _atribut = require("@actions/atribut.action");

var _groupcategory = require("@actions/groupcategory.action");

var _keys = require("../config/keys");

var _auth = require("./auth.action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cookies = new _reactCookie.Cookies();
var CREATE_PICTURE_REQUEST = 'CREATE_PICTURE_REQUEST';
exports.CREATE_PICTURE_REQUEST = CREATE_PICTURE_REQUEST;
var CREATE_PICTURE_PROGRESS = 'CREATE_PICTURE_PROGRESS';
exports.CREATE_PICTURE_PROGRESS = CREATE_PICTURE_PROGRESS;
var CREATE_PICTURE_SUCCESS = 'CREATE_PICTURE_SUCCESS';
exports.CREATE_PICTURE_SUCCESS = CREATE_PICTURE_SUCCESS;
var CREATE_PICTURE_ERROR = 'CREATE_PICTURE_ERROR';
exports.CREATE_PICTURE_ERROR = CREATE_PICTURE_ERROR;
var CREATE_PICTURE_BULK_REQUEST = 'CREATE_PICTURE_BULK_REQUEST';
exports.CREATE_PICTURE_BULK_REQUEST = CREATE_PICTURE_BULK_REQUEST;
var CREATE_PICTURE_BULK_PROGRESS = 'CREATE_PICTURE_BULK_PROGRESS';
exports.CREATE_PICTURE_BULK_PROGRESS = CREATE_PICTURE_BULK_PROGRESS;
var CREATE_PICTURE_BULK_SUCCESS = 'CREATE_PICTURE_BULK_SUCCESS';
exports.CREATE_PICTURE_BULK_SUCCESS = CREATE_PICTURE_BULK_SUCCESS;
var CREATE_PICTURE_BULK_ERROR = 'CREATE_PICTURE_BULK_ERROR';
exports.CREATE_PICTURE_BULK_ERROR = CREATE_PICTURE_BULK_ERROR;
var FETCH_PICTURE_REQUEST = 'FETCH_PICTURE_REQUEST';
exports.FETCH_PICTURE_REQUEST = FETCH_PICTURE_REQUEST;
var FETCH_PICTURE_SUCCESS = 'FETCH_PICTURE_SUCCESS';
exports.FETCH_PICTURE_SUCCESS = FETCH_PICTURE_SUCCESS;
var FETCH_PICTURE_ERROR = 'FETCH_PICTURE_ERROR';
exports.FETCH_PICTURE_ERROR = FETCH_PICTURE_ERROR;
var DELETE_PICTURE_REQUEST = 'DELETE_PICTURE_REQUEST';
exports.DELETE_PICTURE_REQUEST = DELETE_PICTURE_REQUEST;
var DELETE_PICTURE_SUCCESS = 'DELETE_PICTURE_SUCCESS';
exports.DELETE_PICTURE_SUCCESS = DELETE_PICTURE_SUCCESS;
var DELETE_PICTURE_ERROR = 'DELETE_PICTURE_ERROR';
exports.DELETE_PICTURE_ERROR = DELETE_PICTURE_ERROR;
var COMBINE_PICTURE_SUCCESS = 'COMBINE_PICTURE_SUCCESS';
exports.COMBINE_PICTURE_SUCCESS = COMBINE_PICTURE_SUCCESS;
var NULL_PICTURE_SUCCESS = 'NULL_PICTURE_SUCCESS';
exports.NULL_PICTURE_SUCCESS = NULL_PICTURE_SUCCESS;
var NULL_PROGRESS_SUCCESS = 'NULL_PROGRESS_SUCCESS';
exports.NULL_PROGRESS_SUCCESS = NULL_PROGRESS_SUCCESS;
var CREATE_FILE_REQUEST = 'CREATE_FILE_REQUEST';
exports.CREATE_FILE_REQUEST = CREATE_FILE_REQUEST;
var CREATE_FILE_PROGRESS = 'CREATE_FILE_PROGRESS';
exports.CREATE_FILE_PROGRESS = CREATE_FILE_PROGRESS;
var CREATE_FILE_SUCCESS = 'CREATE_FILE_SUCCESS';
exports.CREATE_FILE_SUCCESS = CREATE_FILE_SUCCESS;
var CREATE_FILE_ERROR = 'CREATE_FILE_ERROR';
exports.CREATE_FILE_ERROR = CREATE_FILE_ERROR;
var NULL_FILE_SUCCESS = 'NULL_FILE_SUCCESS';
exports.NULL_FILE_SUCCESS = NULL_FILE_SUCCESS;
var URL_PATH = "".concat(_keys.URL_API, "/picture");
var URL_IMPORT = "".concat(_keys.URL_API, "/import");
var REDIRECT_URL = "/master/product";

function combinePictures(picture) {
  return function (dispatch) {
    return dispatch({
      type: COMBINE_PICTURE_SUCCESS,
      payload: picture
    });
  };
}

function nullPicture() {
  return function (dispatch) {
    return dispatch({
      type: NULL_PICTURE_SUCCESS
    });
  };
}

function nullFile() {
  return function (dispatch) {
    return dispatch({
      type: NULL_FILE_SUCCESS
    });
  };
}

function nullProgress() {
  return function (dispatch) {
    return dispatch({
      type: NULL_PROGRESS_SUCCESS
    });
  };
}

function fetchData(data) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: FETCH_PICTURE_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'get',
      url: "".concat(URL_PATH),
      params: data
    }).then(function (response) {
      dispatch({
        type: FETCH_PICTURE_SUCCESS,
        payload: response.data
      });
    }, function (error) {
      dispatch({
        type: FETCH_PICTURE_SUCCESS,
        error: error.response
      });

      if (error.response.status === 401) {
        dispatch((0, _auth.logoutUser)());
      }
    })["catch"](function (error) {
      dispatch({
        type: FETCH_PICTURE_ERROR,
        error: error
      });
      throw error;
    });
  };
}

function createPicture(data) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: CREATE_PICTURE_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'POST',
      url: URL_PATH,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      onUploadProgress: function onUploadProgress(evt) {
        if (evt.loaded && evt.total) {
          var progress = Math.round(evt.loaded * 100 / evt.total); // console.log('progress', progress);

          dispatch({
            type: CREATE_PICTURE_PROGRESS,
            payload: progress
          });
        }
      }
    }).then(function (response) {
      dispatch({
        type: CREATE_PICTURE_SUCCESS,
        payload: response.data
      });

      _izitoast["default"].success({
        title: 'Success',
        position: 'topRight',
        message: 'Successfully inserted picture!'
      });

      return response;
    }, function (error) {
      dispatch({
        type: CREATE_PICTURE_ERROR,
        error: error.response
      });

      _izitoast["default"].error({
        title: 'Error',
        position: 'topRight',
        message: error.response.data.stat_msg
      });

      throw error;
    });
  };
}

function deleteData(id) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: DELETE_PICTURE_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'DELETE',
      url: "".concat(URL_PATH, "/id/").concat(id)
    }).then(function (response) {
      dispatch({
        type: DELETE_PICTURE_SUCCESS,
        payload: response.data
      });

      _izitoast["default"].success({
        title: 'Success',
        position: 'topRight',
        message: 'Successfully deleted picture!'
      });
    }, function (error) {
      dispatch({
        type: DELETE_PICTURE_ERROR,
        error: error.response
      });

      if (error.response.status === 400) {
        return _izitoast["default"].error({
          title: 'Error',
          position: 'topRight',
          message: 'Image not found on server'
        });
      }

      return _izitoast["default"].error({
        title: 'Error',
        position: 'topRight',
        message: 'Error while deleting data!'
      });
    });
  };
}

function uploadFile(data) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var futurePage = arguments.length > 2 ? arguments[2] : undefined;
  var code = arguments.length > 3 ? arguments[3] : undefined;
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: CREATE_FILE_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'POST',
      url: "".concat(URL_IMPORT, "/").concat(path),
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      onUploadProgress: function onUploadProgress(evt) {
        if (evt.loaded && evt.total) {
          var progress = Math.round(evt.loaded * 100 / evt.total);
          dispatch({
            type: CREATE_FILE_PROGRESS,
            payload: progress
          });
        }
      }
    }).then(function (response) {
      dispatch({
        type: CREATE_FILE_SUCCESS,
        payload: response.data
      });
      var data = response.data.data;
      var params = {
        page: futurePage,
        sort: 'asc',
        by: 'createdAt',
        status: 'true',
        limit: '10'
      };

      if (data.fail) {
        _izitoast["default"].warning({
          title: 'Warning',
          position: 'topRight',
          message: "With ".concat(data.messages, " line fail")
        });
      } else {
        _sweetalert["default"].fire('Success!', 'Data created!', 'success');

        if (path === 'product') {
          var ext = {
            parent_id: '',
            group_id: '',
            category_id: ''
          };
          dispatch((0, _product.fetchData)(Object.assign(params, ext)));
        } else if (path === 'category') {
          params.page = 1;
          delete params.sort;
          delete params.by;
          dispatch((0, _category.fetchData)(params));
        } else if (path === 'attribute') {
          delete params.sort;
          delete params.by;
          dispatch((0, _atribut.fetchData)(params));
        } else if (path === 'group') {
          delete params.sort;
          delete params.by;
          dispatch((0, _groupcategory.fetchData)(params));
        }
      }

      return response;
    }, function (error) {
      if (error.response.status >= 500) {
        throw error.response.data;
      } else {
        dispatch({
          type: CREATE_FILE_ERROR,
          error: error.response
        });

        _izitoast["default"].error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.stat_msg === 'Something Wrong Sir' ? error.response.data.data.messages : error.response.data.stat_msg
        });

        throw error;
      }
    })["catch"](function (error) {
      dispatch({
        type: CREATE_FILE_ERROR,
        error: error
      });
      throw error;
    });
  };
}

function createPictureBulk(data) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: CREATE_PICTURE_BULK_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'POST',
      url: "".concat(URL_PATH, "/bulk"),
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      onUploadProgress: function onUploadProgress(evt) {
        if (evt.loaded && evt.total) {
          var progress = Math.round(evt.loaded * 100 / evt.total); // console.log('progress', progress);

          dispatch({
            type: CREATE_PICTURE_BULK_PROGRESS,
            payload: progress
          });
        }
      }
    }).then(function (response) {
      dispatch({
        type: CREATE_PICTURE_BULK_SUCCESS,
        payload: response.data
      });

      _izitoast["default"].success({
        title: 'Success',
        position: 'topRight',
        message: 'Successfully inserted picture!'
      });

      return response;
    }, function (error) {
      dispatch({
        type: CREATE_PICTURE_BULK_ERROR,
        error: error.response
      });

      _izitoast["default"].error({
        title: 'Error',
        position: 'topRight',
        message: error.response.data.stat_msg === 'Something Wrong Sir' ? error.response.data.data.messages : error.response.data.stat_msg
      });

      throw error;
    });
  };
}