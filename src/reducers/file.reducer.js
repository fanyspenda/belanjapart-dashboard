import {
  CREATE_PICTURE_REQUEST,
  CREATE_PICTURE_PROGRESS,
  CREATE_PICTURE_SUCCESS,
  CREATE_PICTURE_ERROR,
  FETCH_PICTURE_REQUEST,
  FETCH_PICTURE_SUCCESS,
  FETCH_PICTURE_ERROR,
  COMBINE_PICTURE_SUCCESS,
  NULL_PICTURE_SUCCESS,
  NULL_PROGRESS_SUCCESS,
  CREATE_PICTURE_BULK_REQUEST,
  CREATE_PICTURE_BULK_PROGRESS,
  CREATE_PICTURE_BULK_SUCCESS,
  CREATE_PICTURE_BULK_ERROR,
  EXPORT_CSV_REQUEST,
  EXPORT_CSV_SUCCESS,
  EXPORT_CSV_ERROR
} from '../actions/file.action';

const initState = {
  isLoading: false,
  pictures: [],
  data: null,
  datas: null,
  list: [],
  isLoadingCsv: false,
  csv: null,
  progress: 0
};

export default function FileReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_PICTURE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_PICTURE_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        isLoading: true
      };

    case CREATE_PICTURE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      };

    case CREATE_PICTURE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case FETCH_PICTURE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_PICTURE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };

    case FETCH_PICTURE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case COMBINE_PICTURE_SUCCESS:
      return {
        ...state,
        pictures: action.payload
      };

    case NULL_PICTURE_SUCCESS:
      return {
        ...state,
        pictures: [],
        data: null,
        progress: 0
      };

    case NULL_PROGRESS_SUCCESS:
      return {
        ...state,
        progress: 0
      };

    case CREATE_PICTURE_BULK_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_PICTURE_BULK_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        isLoading: true
      };

    case CREATE_PICTURE_BULK_SUCCESS:
      return {
        ...state,
        datas: action.payload.data,
        isLoading: false
      };

    case CREATE_PICTURE_BULK_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case EXPORT_CSV_REQUEST:
      return {
        ...state,
        isLoadingCsv: true
      };

    case EXPORT_CSV_SUCCESS:
      return {
        ...state,
        csv: action.payload,
        isLoadingCsv: false
      };

    case EXPORT_CSV_ERROR:
      return {
        ...state,
        isLoadingCsv: false
      };

    default:
      return state;
  }
}
