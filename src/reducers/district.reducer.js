import {
  FETCH_DISTRICT_REQUEST,
  FETCH_DISTRICT_SUCCESS,
  FETCH_DISTRICT_ERROR
} from '../actions/district.action';

import { setPagination } from '../helpers/parsingPagination';

const initState = {
  isLoading: false,
  data: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    count: 0,
    recordPerPage: 0
  }
};

export default function DistrictReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_DISTRICT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_DISTRICT_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        // pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_DISTRICT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
