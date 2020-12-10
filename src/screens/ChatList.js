import React, {Component} from 'react';
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
import {connect} from 'react-redux';
import userGetAction from '../redux/actions/user';
import profile from '../assets/profile3.jpg';
import moment from 'moment';
import {API_URL} from '@env';

const RenderItem = ({chatlist}) => {
  // console.log("checkin",chatlist.SenderDetails);
  
  const {createdAt, messages} = chatlist;
  const {id, phone, name, picture} = chatlist.SenderDetails;
  console.log(id);
  // console.log(
  //   'cek',
  //   data.map(() => data),
  // );
  // console.log(API_URL+picture);
  let time = moment(createdAt).format('h:mm A');

  const moveChatRoom = () => {
    props.navigation.navigate('ChatRoom', {id:id});
    console.log('ceke', {id});
  };
  
  return (
    <View>
      <TouchableOpacity onPress={() => moveChatRoom()}>
        <View style={style.wrapperChats}>
          <Image
            style={style.img}
            source={picture ? {uri: API_URL + picture} : profile}
          />
          <View style={style.flatlist}>
            <View style={style.topContent}>
              <Text style={style.name}>{name !== null ? name : phone}</Text>
              <Text style={style.time}>{time}</Text>
            </View>
            <View>
              <Text style={style.message}>{messages}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
class ChatListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.auth.token,
    };
  }
  componentDidMount() {
    this.props.getChatList(this.state.token);
    setTimeout(() => {
      StatusBar.setBackgroundColor('#2f2f2f');
    }, 100);
  }
  render() {
    const {data} = this.props.user;
    console.log('ceke Props', data);
    return (
      <ImageBackground source={background} style={style.background}>
        <FlatList
          data={data}
          renderItem={({item}) => <RenderItem chatlist={item} />}
        />
        <Button rounded style={style.btn}>
          <Icon name="chat" size={35} color="white" />
        </Button>
      </ImageBackground>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
const mapDispatchToProps = {
  getChatList: userGetAction.chatlist,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);

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
