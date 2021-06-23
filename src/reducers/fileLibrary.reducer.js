import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_PROGRESS,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  FETCH_FILE_REQUEST,
  FETCH_FILE_SUCCESS,
  FETCH_FILE_ERROR,
  NULL_FILE_LIBRARY_SUCCESS
} from '../actions/fileLibrary.action';

const initState = {
  isLoading: false,
  files: [],
  data: null,
  datas: null,
  list: [],
  progress: 0
};

export default function FileLibraryReducer(state = initState, action) {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case UPLOAD_FILE_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        isLoading: true
      };

    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      };

    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case FETCH_FILE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_FILE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };

    case FETCH_FILE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case NULL_FILE_LIBRARY_SUCCESS:
      return {
        ...state,
        files: [],
        data: null,
        progress: 0
      };

    default:
      return state;
  }
}
