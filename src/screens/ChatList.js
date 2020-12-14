import React, {Component, useEffect , useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import background from '../assets/background.jpg';
// import {connect} from 'react-redux';
// import userGetAction from '../redux/actions/user';
import profile from '../assets/profile3.jpg';
import moment from 'moment';
import {API_URL} from '@env';
import { useSelector, useDispatch } from 'react-redux'
import userGetAction  from '../redux/actions/user'
import RenderItem from '../components/MessageList'

const ChatListScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const {token} = useSelector(state => state.auth)
  const chatList = useSelector(state => state.user.chatList) 
   const pageInfo = useSelector(state => state.user.chatListPageInfo)
   const [isLoading, setIsLoading] = useState(false);
  console.log("pagination",pageInfo);

  useEffect(() => {
    dispatch(userGetAction.chatlist(token))
    dispatch(userGetAction.profile(token));
  }, [])
  
  useEffect(() => {
    
    // console.log(chatList);
  }, [chatList])
  
  const refresh =()=> {
    
    
    setIsLoading(true);
    dispatch(userGetAction.chatlist(token));
    setIsLoading(false);
  }
  const nextPage = () =>{
    if (pageInfo.pages > pageInfo.currentPage) {
      dispatch(userGetAction.chatlist(token,pageInfo.currentPage + 1))
    }
  }
  return (
      <ImageBackground source={background} style={style.background}>
        <FlatList
          data={chatList}
          onRefresh={refresh}
          refreshing={isLoading}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => 
            <RenderItem item={item} navigation={navigation} />
          }
        />
        <Button rounded style={style.btn}>
          <Icon name="chat" size={35} color="white" />
        </Button>
      </ImageBackground>
    );
}

export default ChatListScreen

const style = StyleSheet.create({
  parent: {
    flex: 1,
  },
  wrapperChats: {
    flexDirection: 'row',
    height: 100,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  img: {
    height: 70,
    width: 70,
    marginRight: 15,
    borderRadius: 40,
  },
  flatlist: {
    borderBottomColor: 'gray',
    flexGrow: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  time: {
    fontSize: 12,
    color: '#b4b6b6',
  },
  message: {
    fontSize: 14,
    color: '#9b9b9b',
  },
  btn: {
    width: 70,
    height: 70,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '5%',
  },
});
