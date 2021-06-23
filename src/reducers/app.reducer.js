export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const SET_PARAM_USER_ADMIN = 'SET_PARAM_USER_ADMIN';

const initState = {
  miniSidebar: false,
  params: {}
};

export function toggleSidebar() {
  return dispatch => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
}

export function setParamUserAdmin(data) {
  return dispatch => {
    dispatch({ type: SET_PARAM_USER_ADMIN, payload: data });
  };
}

export default function themeReducer(state = initState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        miniSidebar: !state.miniSidebar
      };

    case SET_PARAM_USER_ADMIN:
      return {
        ...state,
        params: action.payload
      };

    default:
      return state;
  }
}
