import {Button, Input, Item, Text} from 'native-base';
import React from 'react';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import background from '../assets/background.jpg';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import userGetAction from '../redux/actions/user';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {API_URL} from '@env';
import moment from 'moment';
// import socket from '../helpers/socket';
import io from 'socket.io-client';
import {set} from 'react-native-reanimated';
// import BubbleChat from '../components/BubbleChat';
// import {connect} from 'react-redux';

const RenderChat = ({chat}) => {
  const profile = useSelector((state) => state.user.profile);
  let time = moment(chat.createdAt).format('h:mm A');
  const {id} = profile;

  return (
    <View>
      {id === chat.sender ? (
        <View
          style={[
            styles.myChat,
            chat.messages.length <= 10 ? styles.myChat2 : styles.myChat,
          ]}>
          <Text style={{color: 'white'}}>{chat.messages}</Text>
          <View style={{marginTop: 13}}>
            <Text style={styles.date}>{time}</Text>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.thereChat,
            chat.messages.length <= 10 ? styles.thereChat2 : styles.thereChat,
          ]}>
          <Text style={{color: 'white'}}>{chat.messages}</Text>
          <View style={{marginTop: 13}}>
            <Text style={styles.date}>{time}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const ChatRoom = ({route}) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const chatRoom = useSelector((state) => state.user.chatRoom);
  // console.log(status.isSendMessage);
  const chatList = useSelector((state) => state.user.chatList);
  const pageInfo = useSelector((state) => state.user.chatRoomPageInfo);
  const [isLoading, setIsLoading] = React.useState(false);
  const [chatMsg, setChatMsg] = React.useState('');
  // console.log('user', user.id);
  const status = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.profile);
  const myId = user.id;
  const chat = chatRoom;
  const {userId} = route.params;
  // const [textInput, setTextInput] = React.useState('');
  //  console.log("cek",isSend);
  const schema = Yup.object().shape({
    messages: Yup.string().trim().min(1).max(500).required(),
  });
  // console.log("schema",schema);
  // console.log('cek',status.sendMessage);
  const refresh = () => {
    setIsLoading(true);
    dispatch(userGetAction.chatRoom(token, userId, nextPage));
    dispatch(userGetAction.refreshSend());
    setIsLoading(false);
  };
  const isSendMessage = (values = '') => {
    const data = {
      messages: values.messages,
    };
    dispatch(userGetAction.sendChat(data, token, userId));
  };
  const nextPage = () => {
    if (pageInfo.pages > pageInfo.currentPage) {
      dispatch(userGetAction.chatRoom(token, userId, pageInfo.currentPage + 1));
    }
  };

  const getChatRoom = () => {
    dispatch(userGetAction.chatRoom(token, userId));
    dispatch(userGetAction.chatlist(token));
    dispatch(userGetAction.profile(token));
  };
  React.useEffect(() => {
    if (status.sendMessage) {
      dispatch(userGetAction.chatRoom(token, userId));
      dispatch(userGetAction.refreshSend('REFRESH_SEND'));
      dispatch(userGetAction.chatlist(token));
    }
  });
  React.useEffect(() => {
    const socket = io(API_URL);
    console.log('cekin', socket);
    console.log(socket);
    getChatRoom();
    socket.on(myId.toString(), () => {
      getChatRoom();
    });
    return () => {
      socket.close();
    };
  }, []);

  // React.useEffect(() => {
  //   if (chat.messages) {
  //     if (pageInfo.currentPage === 1) {
  //       setData(chat.messages);
  //     } else {
  //       let dataChat = data.concat(chat.messages);
  //       setData(dataChat);
  //     }
  //   }
  // }, [chat.messages]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={background} style={styles.image}>
        <FlatList
          data={chat}
          contentContainerStyle={styles.containerStyle}
          renderItem={({item}) => <RenderChat chat={item} />}
          keyExtractor={(item) => item.id}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          onRefresh={refresh}
          refreshing={false}
          inverted
        />
        <View style={styles.bottom}>
          <Formik
            initialValues={{
              messages: '',
            }}
            validationSchema={schema}
            onSubmit={(values, {resetForm}) => {
              isSendMessage(values);
              resetForm({values: ''});
            }}>
            {({handleChange, handleBlur, values, handleSubmit}) => (
              <>
                <Item style={styles.itemInput}>
                  <Icon name="emoticon-outline" size={25} color="#b4b6b6" />
                  <Input
                    multiline
                    placeholder="Type a message"
                    style={styles.input}
                    onChangeText={handleChange('messages')}
                    onBlur={handleBlur('messages')}
                    value={values.messages}
                  />
                  {values.messages.length > 0 && (
                    <Icon
                      style={styles.iconClip}
                      name="paperclip"
                      size={25}
                      color="#b4b6b6"
                    />
                  )}
                  {!values.messages.length && (
                    <View style={styles.rightInput}>
                      <Icon
                        style={styles.iconClip}
                        name="paperclip"
                        size={25}
                        color="#b4b6b6"
                      />
                      <Icon
                        style={styles.iconCamera}
                        name="camera"
                        size={25}
                        color="#b4b6b6"
                      />
                    </View>
                  )}
                </Item>
                <Button rounded style={styles.btnMic} onPress={handleSubmit}>
                  {values.messages.length > 0 && (
                    <IconFontAwesome name="send" size={25} color="#ffffff" />
                  )}
                  {!values.messages.length && (
                    <Icon name="microphone" size={25} color="#ffffff" />
                  )}
                </Button>
              </>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#2f2f2f',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  thereChat: {
    alignSelf: 'flex-start',
    width: '80%',
    marginLeft: 20,
    backgroundColor: '#2f2f2f',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#ffffff',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  myChat: {
    alignSelf: 'flex-end',
    width: '80%',
    marginRight: 20,
    backgroundColor: '#135e39',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#ffffff',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  thereChat2: {
    alignSelf: 'flex-start',
    width: '30%',
    marginLeft: 20,
    backgroundColor: '#2f2f2f',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#ffffff',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  myChat2: {
    alignSelf: 'flex-end',
    width: '30%',
    marginRight: 20,
    backgroundColor: '#135e39',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#ffffff',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  date: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: '#abadaa',

    bottom: '15%',
    right: '5%',
    position: 'absolute',
  },
  bottom: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  itemInput: {
    width: '83%',
    backgroundColor: '#2f2f2f',
    borderRadius: 50,
    paddingHorizontal: 11,
    marginHorizontal: 6,
    marginBottom: 10,
    borderBottomColor: '#2f2f2f',
  },
  input: {
    maxHeight: 80,
    color: 'white',
  },
  rightInput: {
    flexDirection: 'row',
  },
  btnMic: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6acc9c',
    marginBottom: 10,
  },
  iconClip: {
    transform: [{rotate: '190deg'}],
    marginBottom: 10,
    marginRight: 5,
    marginTop: 10,
  },
  iconCamera: {
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10,
  },
});
