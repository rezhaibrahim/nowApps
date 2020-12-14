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
// import BubbleChat from '../components/BubbleChat';
// import {connect} from 'react-redux';

const RenderChat = ({chat}) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.auth)
  const profile = useSelector((state)=> state.user.profile)
  
  const {id} = profile
  React.useEffect(()=>{

  },[profile])
  React.useEffect(()=>{
    dispatch(userGetAction.profile(token))
  }, [])
  console.log(chat);
  return (
    <View>
      <View style={styles.thereChat}>
        <Text style={{color: 'white'}}>{chat.messages}</Text>
        <Text style={styles.date}>3:10 PM</Text>
      </View>
      <View style={styles.myChat}>
        <Text style={{color: 'white'}}>{chat.myChat}</Text>
        <Text style={styles.date}>3:10 PM</Text>
      </View>
    </View>
  );
};

const ChatRoom = ({route}) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.auth)
  const chatRoom = useSelector((state)=> state.user.chatRoom)

  const {id} = route.params


  React.useEffect(()=>{
   
  }, [chatRoom])

  React.useEffect(()=>{
    dispatch(userGetAction.chatRoom(token,id))
  }, [])


  
  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={background} style={styles.image}>
          <FlatList
          data={chatRoom}
            contentContainerStyle={styles.containerStyle}
            renderItem={({item}) => <RenderChat chat={item} />}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.bottom}>
          {/* <Item style={styles.itemInput}>
            <Icon name="emoticon-outline" size={25} color="#b4b6b6" />
            <Input
              multiline
              placeholder="Type a message"
              style={styles.input}
              onChangeText={isTyping}
            />
            {message.length > 0 && (
              <Icon
                style={styles.iconClip}
                name="paperclip"
                size={25}
                color="#b4b6b6"
              />
            )}
            {!message.length && (
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
          <Button rounded style={styles.btnMic}>
            {message.length > 0 && (
              <IconFontAwesome name="send" size={25} color="#ffffff" />
            )}
            {!message.length && (
              <Icon name="microphone" size={25} color="#ffffff" />
            )}
          </Button> */}
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