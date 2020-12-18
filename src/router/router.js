/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {connect} from 'react-redux';
import getUserAction from '../redux/actions/user';
import {API_URL} from '@env';
import profile from '../assets/profile.png';
import {
  Splash,
  Login,
  Register,
  SplashLoading,
  ChatList,
  Status,
  ChatRoom,
  Setting,
  WelcomeAuth,
  Contact,
  MyProfile,
} from '../screens';

const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="SplashLoading"
        component={SplashLoading}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="WelcomeAuth"
        component={WelcomeAuth}
      />
      <Stack.Screen
        options={{title: 'Enter your phone number', headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

const IconCamera = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="camera" color="black" size={100} />
    </View>
  );
};

const TopTabApp = () => {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        style: {backgroundColor: '#2f2f2f'},
        activeTintColor: 'white',
        indicatorStyle: {backgroundColor: 'white'},
        labelStyle: {fontWeight: 'bold'},
        showIcon: true,
      }}>
      <TopTab.Screen
        name="Camera"
        component={IconCamera}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={{marginTop: 16}}>
              <Icon name="camera" color="white" size={20} />
            </View>
          ),
        }}
      />
      <TopTab.Screen
        name="ChatList"
        component={ChatList}
        options={{tabBarLabel: 'Chat'}}
      />
      <TopTab.Screen name="Status" component={Status} />
      <TopTab.Screen name="Calls" component={ChatList} />
    </TopTab.Navigator>
  );
};

const IconHeaderRight = () => {
  const navigation = useNavigation();
  const [btn, setBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //  console.log("btnicon",btn);
  const toSetting = () => {
    navigation.navigate('Setting');
    setModalVisible(false);
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styleHeader.parent}>
          <View>
            <View style={styleHeader.base}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styleHeader.txt}>Grup baru</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styleHeader.base}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styleHeader.txt}>Siaran baru</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styleHeader.base}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styleHeader.txt}>WhatsApp Web</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styleHeader.base}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styleHeader.txt}>Pesan berbintang</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styleHeader.base}>
              <TouchableOpacity onPress={() => toSetting()}>
                <Text style={styleHeader.txt}>Setelan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{padding: 20}} onPress={() => setBtn(true)}>
          <Icon name="search" size={20} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 20}}
          onPress={() => setModalVisible(true)}>
          <Icon name="ellipsis-v" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styleHeader = StyleSheet.create({
  parent: {backgroundColor: 'white', width: 220, marginLeft: 137},
  base: {margin: 10},
  txt: {
    margin: 5,
    fontSize: 15,
  },
});
const Title = () => {
  return (
    <View>
      <Text style={{color: 'white'}}>Pilih Kontak</Text>
    </View>
  );
};
const IconHeaderRightAddContact = () => {
  const navigation = useNavigation();
  const [btn, setBtn] = useState(false);
  console.log('btnicon', btn);
  return (
    // eslint-disable-next-line no-undef
    <View onPress={() => setModalVisible(false)} style={{flexDirection: 'row'}}>
      <TouchableOpacity style={{padding: 20}} onPress={() => setBtn(true)}>
        <Icon name="search" size={20} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{padding: 20}}
        onPress={() => navigation.navigate('Setting')}>
        <Icon name="ellipsis-v" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const IconHeaderLeft = ({header}) => {
  // console.log("mainHeader",header);
  const navigation = useNavigation();
  const {userId} = header.params;
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const profileFriend = useSelector((state) => state.user.profileFriend);
  // console.log('mainlagi',profileFriend);
  const {name, picture, phone} = profileFriend;
  React.useEffect(() => {
    dispatch(getUserAction.profileFriend(token, userId));
  }, []);

  React.useEffect(() => {
    // console.log(profileFriend);
  }, [profileFriend]);

  return (
    <>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('ChatList')}>
          <Icon name="arrow-left" size={25} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <View>
          <Image
            style={{width: 35, height: 35, borderRadius: 35 / 2}}
            source={picture ? {uri: API_URL + picture} : profile}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#ffffff'}}>
            {name === null ? phone : name}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const IconHeaderRightRoom = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={{marginRight: 25}}>
        <Icon
          style={{transform: [{rotate: '180deg'}]}}
          name="video"
          size={20}
          color="#ffffff"
        />
      </TouchableOpacity>
      <TouchableOpacity style={{marginRight: 25}}>
        <Icon
          style={{transform: [{rotate: '225deg'}]}}
          name="phone"
          size={20}
          color="#ffffff"
        />
      </TouchableOpacity>
      <TouchableOpacity style={{marginRight: 25}}>
        <Icon name="ellipsis-v" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

// const ChatRoomStack = () => {
//   return (
//     <Stack.Navigator>

//     </Stack.Navigator>
//   );
// };
const settingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={() => ({
          headerTitle: '',
          headerTintColor: '#ffffff',
          headerStyle: {backgroundColor: '#2f2f2f', elevation: 0},
        })}
        name="Setting"
        component={Setting}
      />
    </Stack.Navigator>
  );
};
class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        {!this.props.auth.isLogin ? (
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="Auth"
              component={AuthStack}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerTitle: 'NowApp',
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: '#2f2f2f', elevation: 0},
                headerRight: () => <IconHeaderRight />,
                headerLeft: null,
              }}
              name="TopTab"
              component={TopTabApp}
            />
            <Stack.Screen
              options={({route}) => ({
                headerBackImage: () => <IconHeaderLeft header={route} />,
                headerTitle: '',
                headerRight: () => <IconHeaderRightRoom />,
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: '#2f2f2f', elevation: 0},
              })}
              name="ChatRoom"
              component={ChatRoom}
            />
            <Stack.Screen
              options={() => ({
                headerTitle: '',
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: '#2f2f2f', elevation: 0},
              })}
              name="Setting"
              component={Setting}
            />
            <Stack.Screen
              options={() => ({
                headerTitle: 'Profil',
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: '#2f2f2f', elevation: 0},
              })}
              name="MyProfile"
              component={MyProfile}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Contact"
              component={Contact}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Router);
