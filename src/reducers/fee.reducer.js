import {
  FETCH_FEE_REQUEST,
  FETCH_FEE_SUCCESS,
  FETCH_FEE_ERROR,
  DETAIL_FEE_REQUEST,
  DETAIL_FEE_SUCCESS,
  DETAIL_FEE_ERROR,
  CREATE_FEE_REQUEST,
  CREATE_FEE_SUCCESS,
  CREATE_FEE_ERROR,
  UPDATE_FEE_REQUEST,
  UPDATE_FEE_SUCCESS,
  UPDATE_FEE_ERROR,
  DELETE_FEE_REQUEST,
  DELETE_FEE_SUCCESS,
  DELETE_FEE_ERROR,
  CREATE_FILE_REQUEST,
  CREATE_FILE_PROGRESS,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_ERROR
} from '../actions/fee.action';

import { setPagination } from '../helpers/parsingPagination';
// import { dataFEE } from '../helpers/dummyData';

const initState = {
  isLoading: false,
  isLoadingDetail: false,
  progress: 0,
  file: null,
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

export default function feeReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_FEE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_FEE_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_FEE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DETAIL_FEE_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case DETAIL_FEE_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoadingDetail: false
      };

    case DETAIL_FEE_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case CREATE_FEE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_FEE_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoading: false
      };

    case CREATE_FEE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_FEE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_FEE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_FEE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_FEE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_FEE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_FEE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case CREATE_FILE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_FILE_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        isLoading: true
      };

    case CREATE_FILE_SUCCESS:
      return {
        ...state,
        file: action.payload.data,
        isLoading: false
      };

    case CREATE_FILE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
