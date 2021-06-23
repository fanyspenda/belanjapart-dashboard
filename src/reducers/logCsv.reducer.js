import {
  FETCH_LOG_CSV_REQUEST,
  FETCH_LOG_CSV_SUCCESS,
  FETCH_LOG_CSV_ERROR
} from '../actions/logCsv.action';

import { setPagination } from '../helpers/parsingPagination';

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

export default function logCsvReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_LOG_CSV_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_LOG_CSV_SUCCESS:
      return {
        ...state,
        data: action.payload.data || [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_LOG_CSV_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
