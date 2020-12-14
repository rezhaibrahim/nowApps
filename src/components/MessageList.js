import React from 'react';
import  {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
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
import profile from '../assets/profile.png'
import {API_URL} from '@env';
import userGetAction  from '../redux/actions/user'

 export default function RenderItem({item, navigation}) {
     const dispatch = useDispatch();
     const data = item
     let {unread,createdAt,messages} = data
     let {name,picture,phone,id}=data.SenderDetails
     let time= moment(createdAt).format('h:mm A')
     console.log("di component",data.sender);
    
     const toRoomChat = () =>{
         navigation.navigate('ChatRoom', {id})
         console.log(id)
     }
      return (
        <TouchableOpacity onPress={() => toRoomChat()}>
            <View style={style.parent}>
            <View style={style.wrapperChats}>
                <TouchableOpacity>
                <Image
                style={style.img}
                source={picture ? {uri: API_URL+picture} : profile}
              />
                </TouchableOpacity>
              
              <View style={style.flatlist}>
                <View style={style.topContent}>
                  <Text style={style.name}>{name === null ? phone : name}</Text>
                  <Text style={style.time}>{time}</Text>
                </View>
                <View style={style.topContent}>
                  <Text style={style.message}>{messages}</Text>
                  <Text style={style.unread, unread === true ? style.unread : style.read}>{unread ===true ? '[unread]':'[read]'}</Text>
                </View>
               
              </View>
            </View>
        </View>

        </TouchableOpacity>
        
      );
    
  };


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
  