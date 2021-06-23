import {
  FETCH_SECONDARY_PRODUCT_REQUEST,
  FETCH_SECONDARY_PRODUCT_SUCCESS,
  FETCH_SECONDARY_PRODUCT_ERROR,
  DETAIL_SECONDARY_PRODUCT_REQUEST,
  DETAIL_SECONDARY_PRODUCT_SUCCESS,
  DETAIL_SECONDARY_PRODUCT_ERROR,
  CREATE_SECONDARY_PRODUCT_REQUEST,
  CREATE_SECONDARY_PRODUCT_SUCCESS,
  CREATE_SECONDARY_PRODUCT_ERROR,
  UPDATE_SECONDARY_PRODUCT_REQUEST,
  UPDATE_SECONDARY_PRODUCT_SUCCESS,
  UPDATE_SECONDARY_PRODUCT_ERROR,
  UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST,
  UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS,
  UPDATE_STATUS_SECONDARY_PRODUCT_ERROR,
  DELETE_SECONDARY_PRODUCT_REQUEST,
  DELETE_SECONDARY_PRODUCT_SUCCESS,
  DELETE_SECONDARY_PRODUCT_ERROR,
  DELETE_ALL_SECONDARY_PRODUCT_REQUEST,
  DELETE_ALL_SECONDARY_PRODUCT_SUCCESS,
  DELETE_ALL_SECONDARY_PRODUCT_ERROR,
  SET_CURRENT_SECONDARY
} from '../actions/secondary.action';

import { setPagination } from '../helpers/parsingPagination';
// import { dataPRODUCT } from '../helpers/dummyData';

const initState = {
  isLoading: false,
  isLoadingDetail: false,
  data: [],
  dataDetail: [],
  currentSecondary: 0
};

export default function UserReducer(state = initState, action) {
  switch (action.type) {
    case SET_CURRENT_SECONDARY:
      return {
        ...state,
        currentSecondary: action.payload
      };

    case FETCH_SECONDARY_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_SECONDARY_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        // pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_SECONDARY_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DETAIL_SECONDARY_PRODUCT_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case DETAIL_SECONDARY_PRODUCT_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoadingDetail: false
      };

    case DETAIL_SECONDARY_PRODUCT_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case CREATE_SECONDARY_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_SECONDARY_PRODUCT_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoading: false
      };

    case CREATE_SECONDARY_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_SECONDARY_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_SECONDARY_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_SECONDARY_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_STATUS_SECONDARY_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_STATUS_SECONDARY_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_STATUS_SECONDARY_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_SECONDARY_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SECONDARY_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_SECONDARY_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DELETE_ALL_SECONDARY_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ALL_SECONDARY_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_ALL_SECONDARY_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
