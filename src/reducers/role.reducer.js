import {
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_ERROR
} from '../actions/role.action';

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

export default function RoleReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ROLE_SUCCESS:
      return {
        ...state,
        data: action.payload.data ? action.payload.data : [],
        pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_ROLE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
