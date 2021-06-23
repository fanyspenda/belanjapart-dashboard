import {
  FETCH_ATRIBUT_REQUEST,
  FETCH_ATRIBUT_SUCCESS,
  FETCH_ATRIBUT_ERROR,
  DETAIL_ATRIBUT_REQUEST,
  DETAIL_ATRIBUT_SUCCESS,
  DETAIL_ATRIBUT_ERROR,
  CREATE_ATRIBUT_REQUEST,
  CREATE_ATRIBUT_SUCCESS,
  CREATE_ATRIBUT_ERROR,
  UPDATE_ATRIBUT_REQUEST,
  UPDATE_ATRIBUT_SUCCESS,
  UPDATE_ATRIBUT_ERROR,
  DELETE_ATRIBUT_REQUEST,
  DELETE_ATRIBUT_SUCCESS,
  DELETE_ATRIBUT_ERROR,
  FETCH_ALL_ATRIBUT_REQUEST,
  FETCH_ALL_ATRIBUT_SUCCESS,
  FETCH_ALL_ATRIBUT_ERROR
} from '../actions/atribut.action';

import { setPagination } from '../helpers/parsingPagination';
// import { dataAtribut } from '../helpers/dummyData';

const initState = {
  isLoading: false,
  isLoadingDetail: false,
  // data: dataAtribut,
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
    case FETCH_ATRIBUT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ATRIBUT_SUCCESS:
      return {
        ...state,
        data: action.payload.data || [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_ATRIBUT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DETAIL_ATRIBUT_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case DETAIL_ATRIBUT_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoadingDetail: false
      };

    case DETAIL_ATRIBUT_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case CREATE_ATRIBUT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_ATRIBUT_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoading: false
      };

    case CREATE_ATRIBUT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_ATRIBUT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_ATRIBUT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_ATRIBUT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_ATRIBUT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ATRIBUT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_ATRIBUT_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case FETCH_ALL_ATRIBUT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ALL_ATRIBUT_SUCCESS:
      return {
        ...state,
        dataAll: action.payload.data ? action.payload.data : [],
        isLoading: false
      };
    case FETCH_ALL_ATRIBUT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
