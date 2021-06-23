import {
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_ERROR,
  DETAIL_TRANSACTION_REQUEST,
  DETAIL_TRANSACTION_SUCCESS,
  DETAIL_TRANSACTION_ERROR,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_ERROR,
  UPDATE_STATUS_TRANSACTION_REQUEST,
  UPDATE_STATUS_TRANSACTION_SUCCESS,
  UPDATE_STATUS_TRANSACTION_ERROR
} from '../actions/transaction.action';

import { setPagination } from '../helpers/parsingPagination';
// import { dataTransaction, dataTransactionHistory } from '../helpers/dummyData';

const initState = {
  isLoading: false,
  isLoadingDetail: true,
  data: [],
  dataDetail: null,
  dataHistory: null,
  pagination: {
    currentPage: 1,
    lastPage: 1,
    count: 0,
    recordPerPage: 0
  }
};

export default function TransactionReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_TRANSACTION_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case DETAIL_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case DETAIL_TRANSACTION_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        isLoadingDetail: false
      };

    case DETAIL_TRANSACTION_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case DELETE_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_TRANSACTION_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case UPDATE_STATUS_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case UPDATE_STATUS_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_STATUS_TRANSACTION_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    default:
      return state;
  }
}
