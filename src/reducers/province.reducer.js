import {
  FETCH_PROVINCE_REQUEST,
  FETCH_PROVINCE_SUCCESS,
  FETCH_PROVINCE_ERROR,
  FETCH_PROVINCE_CITY_REQUEST,
  FETCH_PROVINCE_CITY_SUCCESS,
  FETCH_PROVINCE_CITY_ERROR
} from '../actions/province.action';

const initState = {
  isLoading: false,
  province: [],
  city: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    count: 0,
    recordPerPage: 0
  }
};

export default function ProvinceReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_PROVINCE_REQUEST:
      return {
        ...state,
        province: [],
        isLoading: true
      };
    case FETCH_PROVINCE_SUCCESS:
      // console.log('datas', action.payload.data);
      return {
        ...state,
        province: action.payload.data ? action.payload.data : [],
        // pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_PROVINCE_ERROR:
      return {
        ...state,
        province: [],
        isLoading: false
      };
    case FETCH_PROVINCE_CITY_REQUEST:
      return {
        ...state,
        city: [],
        isLoading: true
      };
    case FETCH_PROVINCE_CITY_SUCCESS:
      // console.log('datas', action.payload.data);
      return {
        ...state,
        city: action.payload.data ? action.payload.data.city : [],
        // pagination: setPagination(action.payload.pagination),
        isLoading: false
      };
    case FETCH_PROVINCE_CITY_ERROR:
      return {
        ...state,
        city: [],
        isLoading: false
      };

    default:
      return state;
  }
}
