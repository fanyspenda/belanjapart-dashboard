import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  DETAIL_PRODUCT_REQUEST,
  DETAIL_PRODUCT_SUCCESS,
  DETAIL_PRODUCT_ERROR,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  UPDATE_STATUS_PRODUCT_REQUEST,
  UPDATE_STATUS_PRODUCT_SUCCESS,
  UPDATE_STATUS_PRODUCT_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR
} from '../actions/product.action';

import { setPagination } from '../helpers/parsingPagination';
// import { dataPRODUCT } from '../helpers/dummyData';

const initState = {
  isLoading: false,
  isLoadingDetail: false,
  isLoadingSubmit: false,
  data: [],
  dataDetail: null,
  current: {},
  pagination: {
    currentPage: 1,
    lastPage: 1,
    count: 0,
    recordPerPage: 0
  }
};

export default function UserReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DETAIL_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };
    case DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        current: action.payload.data,
        isLoadingDetail: false
      };
    case DETAIL_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        current: action.payload.data,
        isLoadingSubmit: false
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    case UPDATE_STATUS_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_STATUS_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_STATUS_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
