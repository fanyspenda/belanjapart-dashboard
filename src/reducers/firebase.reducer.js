import { SAVE_FCM_TOKEN, ERROR_FCM_TOKEN } from '../actions/firebase.action';

const initState = {
  fcmToken: null
};

export default function firebase(state = initState, action) {
  switch (action.type) {
    case SAVE_FCM_TOKEN:
      return {
        fcmToken: action.payload
      };
    case ERROR_FCM_TOKEN:
      return {};
    default:
      return state;
  }
}
