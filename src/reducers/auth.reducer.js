import { Cookies } from 'react-cookie';
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILURE,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_FAILURE,
  LOGOUT_FAILURE
} from '../actions/auth.action';
import JwtAuthentication from '../helpers/jwtAuthentication';

const cookies = new Cookies();

const localToken = JwtAuthentication.checkExpirity(cookies.get('id_token'));

const initState = {
  isFetching: false,
  isAuthenticated: !!localToken.token,
  // isAuthenticated: true,
  isLoading: false,
  fcmToken: null
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        isLoading: true
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        isLoading: false
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
        isLoading: false
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        isLoading: false
      });
    case FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        errorMessage: '',
        isLoading: true
      });
    case FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        errorMessage: '',
        isLoading: false
      });
    case FORGOT_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        isLoading: false
      });
    case NEW_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        errorMessage: '',
        isLoading: true
      });
    case NEW_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        errorMessage: '',
        isLoading: false
      });
    case NEW_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        isLoading: false
      });
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {
        errorMessage: 'Logout Error',
        isLoading: false
      });
    default:
      return state;
  }
}
