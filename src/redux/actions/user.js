import http from '../../helpers/http';
import qs from 'qs';

export default {
  chatlist: (token) => ({
    type: 'CHAT_LIST',
    payload: http(token).get('/users/chat-list'),
  }),
  chatRoom: (token, id, page) => ({
    type: 'CHAT_ROOM',
    payload: http(token).get('/users/chat-room/' + id + qs.stringify({page})),
  }),
  profileFriend: (token, id) => ({
    type: 'PROFILE_FRIEND',
    payload: http(token).get('/users/profile/' + id)
  }),
  profile: (token) => ({
    type: 'PROFILE',
    payload: http(token).get('/users/profile/')
  })
};
