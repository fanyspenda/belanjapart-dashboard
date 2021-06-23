import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  DETAIL_USER_REQUEST,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_STATUS_USER_REQUEST,
  UPDATE_STATUS_USER_SUCCESS,
  UPDATE_STATUS_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from '../actions/user.action';

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
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DETAIL_USER_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case DETAIL_USER_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoadingDetail: false
      };

    case DETAIL_USER_ERROR:
      return {
        ...state,
        dataDetail: null,
        isLoadingDetail: false
      };

    case CREATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case CREATE_USER_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_STATUS_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_STATUS_USER_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_STATUS_USER_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
