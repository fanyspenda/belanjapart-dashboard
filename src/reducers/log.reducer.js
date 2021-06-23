import {
  FETCH_LOG_REQUEST,
  FETCH_LOG_SUCCESS,
  FETCH_LOG_ERROR,
  READ_LOG_REQUEST,
  READ_LOG_SUCCESS,
  READ_LOG_ERROR
} from '../actions/log.action';

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

export default function logReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_LOG_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_LOG_SUCCESS:
      return {
        ...state,
        data: action.payload.data || [],
        isLoading: false
      };
    case FETCH_LOG_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_LOG_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case READ_LOG_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case READ_LOG_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
