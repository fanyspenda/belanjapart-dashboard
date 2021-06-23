import {
  CREATE_FILE_REQUEST,
  CREATE_FILE_PROGRESS,
  CREATE_FILE_SUCCESS,
  CREATE_FILE_ERROR,
  NULL_FILE_SUCCESS
} from '../actions/file.action';

const initState = {
  isLoading: false,
  data: null,
  progress: 0
};

export default function FileUploadReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_FILE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_FILE_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        isLoading: true
      };

    case CREATE_FILE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      };

    case CREATE_FILE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case NULL_FILE_SUCCESS:
      return {
        ...state,
        data: null,
        progress: 0
      };

    default:
      return state;
  }
}
