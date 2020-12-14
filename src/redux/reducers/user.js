const initialState = {
  chatList: {},
  chatRoom: [],
  chatRoomPageInfo: {},
  profileFriend:{},
  profile:{},
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHAT_LIST_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CHAT_LIST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.message,
      };
    }
    case 'CHAT_LIST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        chatList: action.payload.data.results,
      };
    }
    case 'CHAT_ROOM_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Loading get chat room',
      };
    }
    case 'CHAT_ROOM_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.message,
      };
    }
    case 'CHAT_ROOM_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        chatRoom: action.payload.data.results,
      };
    }
    case 'PROFILE_FRIEND_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Loading get profile friend',
      };
    }
    case 'PROFILE_FRIEND_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.message,
      };
    }
    case 'PROFILE_FRIEND_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        profileFriend: action.payload.data.results,
      };
    }
    case 'PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Loading get profile friend',
      };
    }
    case 'PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.message,
      };
    }
    case 'PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        profile: action.payload.data.results,
      };
    }
    default: {
      return state;
    }
  }
};
