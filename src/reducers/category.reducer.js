import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_ERROR,
  FETCH_CATEGORY_FILTER_REQUEST,
  FETCH_CATEGORY_FILTER_SUCCESS,
  FETCH_CATEGORY_FILTER_ERROR,
  DETAIL_CATEGORY_REQUEST,
  DETAIL_CATEGORY_SUCCESS,
  DETAIL_CATEGORY_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  UPDATE_STATUS_CATEGORY_REQUEST,
  UPDATE_STATUS_CATEGORY_SUCCESS,
  UPDATE_STATUS_CATEGORY_ERROR,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  FETCH_ALL_CATEGORY_REQUEST,
  FETCH_ALL_CATEGORY_SUCCESS,
  FETCH_ALL_CATEGORY_ERROR
} from '../actions/category.action';

import { setPagination } from '../helpers/parsingPagination';
// import { dataCategory } from '../helpers/dummyData';

const initState = {
  isLoading: false,
  isLoadingDetail: false,
  isLoadingSubmit: false,
  data: [],
  dataFilter: [],
  dataDetail: null,
  dataAll: [],
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
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case FETCH_CATEGORY_FILTER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_CATEGORY_FILTER_SUCCESS:
      return {
        ...state,
        dataFilter: action.payload.data || [],
        isLoading: false
      };
    case FETCH_CATEGORY_FILTER_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DETAIL_CATEGORY_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case DETAIL_CATEGORY_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoadingDetail: false
      };

    case DETAIL_CATEGORY_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoadingSubmit: false
      };

    case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    case UPDATE_STATUS_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_STATUS_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_STATUS_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case FETCH_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        dataAll: action.payload.data ? action.payload.data : [],
        isLoading: false
      };
    case FETCH_ALL_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
