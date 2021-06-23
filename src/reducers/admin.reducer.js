import {
  FETCH_ADMIN_REQUEST,
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_ERROR,
  DETAIL_ADMIN_REQUEST,
  DETAIL_ADMIN_SUCCESS,
  DETAIL_ADMIN_ERROR,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_ERROR,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_ERROR,
  UPDATE_STATUS_ADMIN_REQUEST,
  UPDATE_STATUS_ADMIN_SUCCESS,
  UPDATE_STATUS_ADMIN_ERROR,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  FETCH_CURRENT_ADMIN
} from '../actions/admin.action';

import { setPagination } from '../helpers/parsingPagination';

const initState = {
  isLoading: false,
  isLoadingDetail: false,
  data: [],
  dataDetail: null,
  current: null,
  pagination: {
    currentPage: 1,
    lastPage: 1,
    count: 0,
    recordPerPage: 0
  }
};

export default function UserReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ADMIN_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DETAIL_ADMIN_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case DETAIL_ADMIN_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoadingDetail: false
      };

    case DETAIL_ADMIN_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case CREATE_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoading: false
      };

    case CREATE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_STATUS_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_STATUS_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_STATUS_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case FETCH_CURRENT_ADMIN:
      return {
        ...state,
        current: action.payload.data
      };

    default:
      return state;
  }
}
