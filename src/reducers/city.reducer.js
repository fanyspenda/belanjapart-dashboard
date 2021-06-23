import {
  FETCH_CITY_DISTRICT_REQUEST,
  FETCH_CITY_DISTRICT_SUCCESS,
  FETCH_CITY_DISTRICT_ERROR
} from '../actions/city.action';

// import { setPagination } from '../helpers/parsingPagination';

const initState = {
  isLoading: false,
  district: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    count: 0,
    recordPerPage: 0
  }
};

export default function CityReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_CITY_DISTRICT_REQUEST:
      return {
        ...state,
        district: [],
        isLoading: true
      };
    case FETCH_CITY_DISTRICT_SUCCESS:
      return {
        ...state,
        district: action.payload.data ? action.payload.data.district : [],
        // pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    // console.log('cityyy', action.payload.data);
    case FETCH_CITY_DISTRICT_ERROR:
      return {
        ...state,
        district: [],
        isLoading: false
      };

    default:
      return state;
  }
}
