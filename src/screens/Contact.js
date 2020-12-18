import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import {Container} from 'native-base';
import background from '../assets/background.jpg';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import profile from '../assets/profile.png';
import {API_URL} from '@env';
// import component
import HeaderContact from '../components/HeaderForContact';
import ListContact from '../components/ContactList';
import userGetAction from '../redux/actions/user';

const RenderItem = ({item, navigation}) => {
  // console.log("cek item",item);

  const dispatch = useDispatch();
  const {id, name, info, picture, phone} = item;
  const user = useSelector((state) => state.user.profile);
  console.log('cek item', API_URL + picture);
  // console.log(chatList.SenderDetails.picture);
  const userId = user.id !== item.id ? item.id : item.id;

  const toRoomChat = () => {
    navigation.navigate('ChatRoom', {userId});
    dispatch(userGetAction.clear());
  };

  return (
    <TouchableOpacity onPress={() => toRoomChat()}>
      <View style={styles.parent}>
        <View style={styles.wrapperChats}>
          <TouchableOpacity>
            <Image
              style={styles.img}
              source={picture !== null ? {uri: API_URL + picture} : profile}
            />
          </TouchableOpacity>

          <View style={styles.flatlist}>
            <View style={styles.topContent}>
              <Text style={styles.name}>{name === null ? phone : name}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Contact = ({navigation}) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const chatList = useSelector((state) => state.user.chatList);
  const pageInfo = useSelector((state) => state.user.chatListPageInfo);
  const user = useSelector((state) => state.user.profile);
  const searching = useSelector((state) => state.user.resultSearch);
  console.log('SEARCH', searching);
  const [rollback, setRollback] = React.useState(false);

  const refresh = () => {
    dispatch(userGetAction.chatlist(token));
    setRollback(false);
    dispatch(userGetAction.clear());
  };
  const nextPage = () => {
    if (pageInfo.pages > pageInfo.currentPage) {
      dispatch(userGetAction.chatlist(token, pageInfo.currentPage + 1));
    }
  };

  return (
    <>
      <HeaderContact navigation={navigation} />
      <ImageBackground source={background} style={styles.image}>
        {searching.length === 0 && rollback === false ? (
          <>
            <TouchableOpacity style={styles.base}>
              <View style={styles.backgroundIcon}>
                <Material name="group" size={30} color="white" />
              </View>
              <View style={styles.baseTitle}>
                <Text style={styles.title}>Group baru</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.base}>
              <View style={styles.backgroundIcon}>
                <Icon name="user-plus" size={20} color="white" />
              </View>

              <View style={styles.baseTitle}>
                <Text style={styles.title}>Kontak baru</Text>
                <View style={styles.barcode}>
                  <Icon name="qrcode" size={30} color="#135e39" />
                </View>
              </View>
            </TouchableOpacity>

            <FlatList
              data={chatList}
              onRefresh={refresh}
              refreshing={rollback}
              onEndReached={nextPage}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => (
                <ListContact item={item} navigation={navigation} />
              )}
              keyExtractor={(item) =>
                item.id.toString().concat(item.SenderDetails.name)
              }
            />
          </>
        ) : (
          <FlatList
            data={searching}
            onRefresh={refresh}
            refreshing={rollback}
            renderItem={({item}) => (
              <RenderItem item={item} navigation={navigation} />
            )}
          />
        )}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  barcode: {
    paddingLeft: 120,
  },
  baseTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  backgroundIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#135e39',
    marginTop: 20,
    marginLeft: 20,
  },
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
});
export default Contact;
