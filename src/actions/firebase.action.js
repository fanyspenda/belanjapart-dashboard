import iziToast from 'izitoast';
import { getFcmToken } from '../../public/firebase/firebase';

export const SAVE_FCM_TOKEN = 'SAVE_FCM_TOKEN';
export const ERROR_FCM_TOKEN = 'ERROR_FCM_TOKEN';

export function getToken() {
  return async dispatch => {
    const token = await getFcmToken().then(token => token);
    if (token.success === false) {
      dispatch({ type: ERROR_FCM_TOKEN, action: token.message });
    } else {
      dispatch({ type: SAVE_FCM_TOKEN, action: token.message });
    }
  };
}
