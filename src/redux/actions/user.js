import http from '../../helpers/http';
import qs from 'qs';

export default {
  login: (data) => ({
    type: 'LOGIN',
    payload: http().post('/login', qs.stringify(data)),
  }),
  chatlist: (token) => ({
    type: 'CHAT_LIST',
    payload: http(token).get('/users/chat-list'),
  }),
  chatRoom: (token, id, page) => ({
    type: 'CHAT_ROOM',
    payload: http(token).get('/users/chat-room/' + id + qs.stringify({page})),
  }),
};
