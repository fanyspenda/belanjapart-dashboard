import {
  FETCH_GROUPCATEGORY_REQUEST,
  FETCH_GROUPCATEGORY_SUCCESS,
  FETCH_GROUPCATEGORY_ERROR,
  DETAIL_GROUPCATEGORY_REQUEST,
  DETAIL_GROUPCATEGORY_SUCCESS,
  DETAIL_GROUPCATEGORY_ERROR,
  CREATE_GROUPCATEGORY_REQUEST,
  CREATE_GROUPCATEGORY_SUCCESS,
  CREATE_GROUPCATEGORY_ERROR,
  UPDATE_GROUPCATEGORY_REQUEST,
  UPDATE_GROUPCATEGORY_SUCCESS,
  UPDATE_GROUPCATEGORY_ERROR,
  UPDATE_STATUS_GROUPCATEGORY_REQUEST,
  UPDATE_STATUS_GROUPCATEGORY_SUCCESS,
  UPDATE_STATUS_GROUPCATEGORY_ERROR,
  DELETE_GROUPCATEGORY_REQUEST,
  DELETE_GROUPCATEGORY_SUCCESS,
  DELETE_GROUPCATEGORY_ERROR,
  FETCH_ALL_GROUPCATEGORY_REQUEST,
  FETCH_ALL_GROUPCATEGORY_SUCCESS,
  FETCH_ALL_GROUPCATEGORY_ERROR
} from '../actions/groupcategory.action';

import { setPagination } from '../helpers/parsingPagination';
// import { dataGroupCategory } from '../helpers/dummyData';

const initState = {
  isLoading: false,
  isLoadingDetail: false,
  data: [],
  dataDetail: null,
  current: null,
  dataAll: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    count: 0,
    recordPerPage: 0
  }
};

export default function UserReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_GROUPCATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_GROUPCATEGORY_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_GROUPCATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DETAIL_GROUPCATEGORY_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case DETAIL_GROUPCATEGORY_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoadingDetail: false
      };

    case DETAIL_GROUPCATEGORY_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case CREATE_GROUPCATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_GROUPCATEGORY_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoading: false
      };

    case CREATE_GROUPCATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_GROUPCATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_GROUPCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_GROUPCATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_STATUS_GROUPCATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_STATUS_GROUPCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_STATUS_GROUPCATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_GROUPCATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_GROUPCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_GROUPCATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case FETCH_ALL_GROUPCATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ALL_GROUPCATEGORY_SUCCESS:
      return {
        ...state,
        dataAll: action.payload.data ? action.payload.data : [],
        isLoading: false
      };
    case FETCH_ALL_GROUPCATEGORY_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
