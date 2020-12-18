import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
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
import profile from '../assets/profile.png';
import {API_URL} from '@env';
import userGetAction from '../redux/actions/user';

export default function RenderItem({item, navigation}) {
  const data = item;
  console.log(data);

  // let {name,phone,info,picture, createdAt } = data;
  let {name, picture, phone, id} = data.SenderDetails;
  // let time = moment(createdAt).format('h:mm A');
  const user = useSelector((state) => state.user.profile);
  // console.log('hay',data.SenderDetails);
  const userId = user.id === data.SenderDetails.id ? data.RecipientDetails.id :data.SenderDetails.id

  const toRoomChat = () => {
    navigation.navigate('ChatRoom', {userId});
    console.log(userId);
  };
  return (
    <TouchableOpacity onPress={() => toRoomChat()}>
      <View style={style.parent}>
        <View style={style.wrapperChats}>
          <TouchableOpacity>
            <Image
              style={style.img}
              source={
                (picture,
                user.id === data.SenderDetails.id
                  ? data.RecipientDetails.picture
                    ? {uri: API_URL + data.RecipientDetails.picture}
                    : profile
                  : data.SenderDetails.picture
                  ? {uri: API_URL + data.SenderDetails.picture}
                  : profile)
              }
            />
          </TouchableOpacity>

          <View style={style.flatlist}>
            <View style={style.topContent}>
              {user.id === data.SenderDetails.id ? (
                <Text style={style.name}>
                  {data.RecipientDetails.name === null
                    ? data.RecipientDetails.phone
                    : data.RecipientDetails.name}
                </Text>
              ) : (
                <Text style={style.name}>
                  {data.SenderDetails.name === null
                    ? data.SenderDetails.phone
                    : data.SenderDetails.name}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  parent: {
    flex: 1,
  },
  unread: {
    color: 'red',
  },
  read: {
    color: 'green',
  },
  wrapperChats: {
    flexDirection: 'row',
    height: 100,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
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
