import { dispatch } from 'rxjs/internal/observable/pairs';
import openSocket from 'socket.io-client';
import { URL_COMMON } from '../config/keys';

// const socket = openSocket('http://wine-backend.twisdev.com/socket');
// const socket = openSocket(URL_SOCKET);

export function connectSocket() {
  notification();
}

async function notification() {
  const socket = await openSocket(`${URL_COMMON}v1/api-admin/ws`, {
    jsonp: false,
    transports: ['websocket'],
    path: '/socket/'
  });
  socket.on('notificationAlert', message => {
    console.log('messageFromSocket', message);
  });
  console.log('responseSocket');
}
