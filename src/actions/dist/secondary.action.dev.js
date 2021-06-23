"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;
exports.detailSecondary = detailSecondary;
exports.createData = createData;
exports.updateSecondary = updateSecondary;
exports.updateStatusData = updateStatusData;
exports.deleteData = deleteData;
exports.openModal = openModal;
exports.deleteAll = deleteAll;
exports.setCurrentSecondary = setCurrentSecondary;
exports.SET_CURRENT_SECONDARY = exports.OPEN_SECONDARY_PRODUCT_MODAL = exports.DELETE_ALL_SECONDARY_PRODUCT_ERROR = exports.DELETE_ALL_SECONDARY_PRODUCT_SUCCESS = exports.DELETE_ALL_SECONDARY_PRODUCT_REQUEST = exports.DELETE_SECONDARY_PRODUCT_ERROR = exports.DELETE_SECONDARY_PRODUCT_SUCCESS = exports.DELETE_SECONDARY_PRODUCT_REQUEST = exports.UPDATE_STATUS_SECONDARY_PRODUCT_ERROR = exports.UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS = exports.UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST = exports.UPDATE_SECONDARY_PRODUCT_ERROR = exports.UPDATE_SECONDARY_PRODUCT_SUCCESS = exports.UPDATE_SECONDARY_PRODUCT_REQUEST = exports.CREATE_SECONDARY_PRODUCT_ERROR = exports.CREATE_SECONDARY_PRODUCT_SUCCESS = exports.CREATE_SECONDARY_PRODUCT_REQUEST = exports.DETAIL_SECONDARY_PRODUCT_ERROR = exports.DETAIL_SECONDARY_PRODUCT_SUCCESS = exports.DETAIL_SECONDARY_PRODUCT_REQUEST = exports.FETCH_SECONDARY_PRODUCT_ERROR = exports.FETCH_SECONDARY_PRODUCT_SUCCESS = exports.FETCH_SECONDARY_PRODUCT_REQUEST = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _reactCookie = require("react-cookie");

var _izitoast = _interopRequireDefault(require("izitoast"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _keys = require("../config/keys");

var _auth = require("./auth.action");

var _product = require("./product.action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cookies = new _reactCookie.Cookies();
var FETCH_SECONDARY_PRODUCT_REQUEST = 'FETCH_SECONDARY_PRODUCT_REQUEST';
exports.FETCH_SECONDARY_PRODUCT_REQUEST = FETCH_SECONDARY_PRODUCT_REQUEST;
var FETCH_SECONDARY_PRODUCT_SUCCESS = 'FETCH_SECONDARY_PRODUCT_SUCCESS';
exports.FETCH_SECONDARY_PRODUCT_SUCCESS = FETCH_SECONDARY_PRODUCT_SUCCESS;
var FETCH_SECONDARY_PRODUCT_ERROR = 'FETCH_SECONDARY_PRODUCT_ERROR';
exports.FETCH_SECONDARY_PRODUCT_ERROR = FETCH_SECONDARY_PRODUCT_ERROR;
var DETAIL_SECONDARY_PRODUCT_REQUEST = 'DETAIL_SECONDARY_PRODUCT_REQUEST';
exports.DETAIL_SECONDARY_PRODUCT_REQUEST = DETAIL_SECONDARY_PRODUCT_REQUEST;
var DETAIL_SECONDARY_PRODUCT_SUCCESS = 'DETAIL_SECONDARY_PRODUCT_SUCCESS';
exports.DETAIL_SECONDARY_PRODUCT_SUCCESS = DETAIL_SECONDARY_PRODUCT_SUCCESS;
var DETAIL_SECONDARY_PRODUCT_ERROR = 'DETAIL_SECONDARY_PRODUCT_ERROR';
exports.DETAIL_SECONDARY_PRODUCT_ERROR = DETAIL_SECONDARY_PRODUCT_ERROR;
var CREATE_SECONDARY_PRODUCT_REQUEST = 'CREATE_SECONDARY_PRODUCT_REQUEST';
exports.CREATE_SECONDARY_PRODUCT_REQUEST = CREATE_SECONDARY_PRODUCT_REQUEST;
var CREATE_SECONDARY_PRODUCT_SUCCESS = 'CREATE_SECONDARY_PRODUCT_SUCCESS';
exports.CREATE_SECONDARY_PRODUCT_SUCCESS = CREATE_SECONDARY_PRODUCT_SUCCESS;
var CREATE_SECONDARY_PRODUCT_ERROR = 'CREATE_SECONDARY_PRODUCT_ERROR';
exports.CREATE_SECONDARY_PRODUCT_ERROR = CREATE_SECONDARY_PRODUCT_ERROR;
var UPDATE_SECONDARY_PRODUCT_REQUEST = 'UPDATE_SECONDARY_PRODUCT_REQUEST';
exports.UPDATE_SECONDARY_PRODUCT_REQUEST = UPDATE_SECONDARY_PRODUCT_REQUEST;
var UPDATE_SECONDARY_PRODUCT_SUCCESS = 'UPDATE_SECONDARY_PRODUCT_SUCCESS';
exports.UPDATE_SECONDARY_PRODUCT_SUCCESS = UPDATE_SECONDARY_PRODUCT_SUCCESS;
var UPDATE_SECONDARY_PRODUCT_ERROR = 'UPDATE_SECONDARY_PRODUCT_ERROR';
exports.UPDATE_SECONDARY_PRODUCT_ERROR = UPDATE_SECONDARY_PRODUCT_ERROR;
var UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST = 'UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST';
exports.UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST = UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST;
var UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS = 'UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS';
exports.UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS = UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS;
var UPDATE_STATUS_SECONDARY_PRODUCT_ERROR = 'UPDATE_STATUS_SECONDARY_PRODUCT_ERROR';
exports.UPDATE_STATUS_SECONDARY_PRODUCT_ERROR = UPDATE_STATUS_SECONDARY_PRODUCT_ERROR;
var DELETE_SECONDARY_PRODUCT_REQUEST = 'DELETE_SECONDARY_PRODUCT_REQUEST';
exports.DELETE_SECONDARY_PRODUCT_REQUEST = DELETE_SECONDARY_PRODUCT_REQUEST;
var DELETE_SECONDARY_PRODUCT_SUCCESS = 'DELETE_SECONDARY_PRODUCT_SUCCESS';
exports.DELETE_SECONDARY_PRODUCT_SUCCESS = DELETE_SECONDARY_PRODUCT_SUCCESS;
var DELETE_SECONDARY_PRODUCT_ERROR = 'DELETE_SECONDARY_PRODUCT_ERROR';
exports.DELETE_SECONDARY_PRODUCT_ERROR = DELETE_SECONDARY_PRODUCT_ERROR;
var DELETE_ALL_SECONDARY_PRODUCT_REQUEST = 'DELETE_ALL_SECONDARY_PRODUCT_REQUEST';
exports.DELETE_ALL_SECONDARY_PRODUCT_REQUEST = DELETE_ALL_SECONDARY_PRODUCT_REQUEST;
var DELETE_ALL_SECONDARY_PRODUCT_SUCCESS = 'DELETE_ALL_SECONDARY_PRODUCT_SUCCESS';
exports.DELETE_ALL_SECONDARY_PRODUCT_SUCCESS = DELETE_ALL_SECONDARY_PRODUCT_SUCCESS;
var DELETE_ALL_SECONDARY_PRODUCT_ERROR = 'DELETE_ALL_SECONDARY_PRODUCT_ERROR';
exports.DELETE_ALL_SECONDARY_PRODUCT_ERROR = DELETE_ALL_SECONDARY_PRODUCT_ERROR;
var OPEN_SECONDARY_PRODUCT_MODAL = 'OPEN_SECONDARY_PRODUCT_MODAL';
exports.OPEN_SECONDARY_PRODUCT_MODAL = OPEN_SECONDARY_PRODUCT_MODAL;
var BASE_URL = "".concat(_keys.URL_API, "/secondary_product");
var REDIRECT_URL = "/master/product";

function fetchData(data) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: FETCH_SECONDARY_PRODUCT_REQUEST,
      loading: true
    }); // dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: dummy.user });

    return (0, _axios["default"])({
      method: 'get',
      url: "".concat(BASE_URL),
      params: data
    }).then(function (response) {
      dispatch({
        type: FETCH_SECONDARY_PRODUCT_SUCCESS,
        payload: response.data
      });
    }, function (error) {
      dispatch({
        type: FETCH_SECONDARY_PRODUCT_ERROR,
        error: error.response
      });

      if (error.response.status === 401) {
        dispatch((0, _auth.logoutUser)());
      }
    })["catch"](function (error) {
      dispatch({
        type: FETCH_SECONDARY_PRODUCT_ERROR,
        error: error
      });
      throw error;
    });
  };
}

function detailSecondary(id) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: DETAIL_SECONDARY_PRODUCT_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'GET',
      url: "".concat(BASE_URL, "/id/").concat(id)
    }).then(function (response) {
      dispatch({
        type: DETAIL_SECONDARY_PRODUCT_SUCCESS,
        payload: response.data
      });
    }, function (error) {
      dispatch({
        type: DETAIL_SECONDARY_PRODUCT_ERROR,
        error: error.response
      });
    });
  };
}

function createData(data, code) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: CREATE_SECONDARY_PRODUCT_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'POST',
      url: "".concat(BASE_URL),
      headers: {},
      data: data
    }).then(function (response) {
      dispatch({
        type: CREATE_SECONDARY_PRODUCT_SUCCESS,
        payload: response.data
      });

      _izitoast["default"].success({
        title: 'Success',
        position: 'topRight',
        message: 'Successfully Data created!'
      });

      dispatch((0, _product.detailData)(code)); // window.location.href = REDIRECT_URL;
      // swal.fire('Success!', 'Data created!', 'success').then(() => {
      //   window.location.href = REDIRECT_URL;
      // });
    }, function (error) {
      dispatch({
        type: CREATE_SECONDARY_PRODUCT_ERROR,
        error: error.response
      });

      if (error.response.status === 400) {
        _izitoast["default"].error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.stat_msg
        });
      } else if (error.response.status === 401) {
        dispatch((0, _auth.logoutUser)());
      } else {
        _izitoast["default"].error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.stat_msg
        });
      }
    });
  };
}

function updateSecondary(data) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: UPDATE_SECONDARY_PRODUCT_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'POST',
      url: "".concat(BASE_URL),
      headers: {},
      data: data
    }).then(function (response) {
      dispatch({
        type: UPDATE_SECONDARY_PRODUCT_SUCCESS,
        payload: response.data
      });

      _izitoast["default"].success({
        title: 'Success',
        position: 'topRight',
        message: 'Invalid input Secondary Product'
      });

      window.location.href = REDIRECT_URL;
    }, function (error) {
      dispatch({
        type: UPDATE_SECONDARY_PRODUCT_ERROR,
        error: error.response
      });

      if (error.response.status === 400) {
        _izitoast["default"].error({
          title: 'Error',
          position: 'topRight',
          message: 'Invalid input Secondary Product'
        });
      } else if (error.response.status === 401) {
        dispatch((0, _auth.logoutUser)());
      } else {
        _izitoast["default"].error({
          title: 'Error',
          position: 'topRight',
          message: error.response.data.stat_msg
        });
      }
    });
  };
}

function updateStatusData(data, id, params) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST
    });
    return (0, _axios["default"])({
      method: 'POST',
      url: "".concat(BASE_URL, "/status/").concat(id),
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    }).then(function () {
      dispatch({
        type: UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS
      });
      dispatch(fetchData(params));
    }, function (error) {
      dispatch({
        type: UPDATE_STATUS_SECONDARY_PRODUCT_ERROR,
        error: error.response
      });

      _izitoast["default"].error({
        title: 'Error',
        position: 'topRight',
        message: 'Error!'
      });
    });
  };
}

function deleteData(id) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: DELETE_SECONDARY_PRODUCT_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'DELETE',
      url: "".concat(BASE_URL, "/id/").concat(id)
    }).then(function (response) {
      dispatch({
        type: DELETE_SECONDARY_PRODUCT_SUCCESS,
        payload: response.data
      });
      dispatch(fetchData({
        page: 1,
        limit: 10,
        status: true
      }));

      _izitoast["default"].success({
        title: 'Success',
        position: 'topRight',
        message: 'Successfully deleted record!'
      });
    }, function (error) {
      dispatch({
        type: DELETE_SECONDARY_PRODUCT_ERROR,
        error: error.response
      });

      _izitoast["default"].error({
        title: 'Error',
        position: 'topRight',
        message: 'Error deleted data!'
      });
    });
  };
}

function openModal(id) {
  return function (dispatch) {
    dispatch({
      type: OPEN_SECONDARY_PRODUCT_MODAL,
      payload: id
    });
  };
}

function deleteAll(id, code) {
  var token = cookies.get('id_token') || null;
  _axios["default"].defaults.headers.common.Authorization = "".concat(token);
  return function (dispatch) {
    dispatch({
      type: DELETE_ALL_SECONDARY_PRODUCT_REQUEST,
      loading: true
    });
    return (0, _axios["default"])({
      method: 'DELETE',
      url: "".concat(BASE_URL, "/productID/").concat(id)
    }).then(function (response) {
      dispatch({
        type: DELETE_ALL_SECONDARY_PRODUCT_SUCCESS,
        payload: response.data
      });

      _izitoast["default"].success({
        title: 'Success',
        position: 'topRight',
        message: 'Successfully delete record!'
      });

      if (!code) {
        dispatch(fetchData({
          page: 1,
          limit: 10,
          status: true
        }));
        window.location.href = REDIRECT_URL;
        return false;
      }

      return true;
    }, function (error) {
      dispatch({
        type: DELETE_ALL_SECONDARY_PRODUCT_ERROR,
        error: error.response
      });

      _izitoast["default"].error({
        title: 'Error',
        position: 'topRight',
        message: 'Error deleted data!'
      });
    });
  };
}

var SET_CURRENT_SECONDARY = 'SET_CURRENT_SECONDARY';
exports.SET_CURRENT_SECONDARY = SET_CURRENT_SECONDARY;

function setCurrentSecondary(current) {
  return function (dispatch) {
    dispatch({
      type: SET_CURRENT_SECONDARY,
      payload: current
    });
  };
}