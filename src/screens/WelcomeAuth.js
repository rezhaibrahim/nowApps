import React, {useEffect} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar
} from 'react-native';
import {Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import background from '../assets/background.jpg';
import background2 from '../assets/background2.jpg';
import IsLoading from './SplashLoading';

const WelcomeAuth = ({navigation}) => {
useEffect(() => {
    setTimeout(() => {
        StatusBar.setBackgroundColor('#2f2f2f');
      }, 100);
}, [])
  return (
    <>
      <View style={style.container2}>
        <ImageBackground source={background} style={style.image}>
          <Text style={style.title1}>
            Welcome to
            <Text style={style.title2}> NowApps</Text>
          </Text>
          <Thumbnail style={style.thumbnail} source={background2} />
         
          <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Login")}>
            <Text style={style.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={() => navigation.navigate("Register")}>
            <Text style={style.btnText}>Register</Text>
          </TouchableOpacity>
          <Text style={style.createBy}>
            Create by Rezha Maulana Jaya
          </Text>
        </ImageBackground>
      </View>
    </>
  );
};

export default WelcomeAuth;

const style = StyleSheet.create({
  description: {
    marginTop: 50,
    marginLeft: 25,
    marginRight: 10,
    paddingTop: 20,
    paddingRight: 50,
    paddingLeft: 60,
  },
  thumbnail: {height: 270, width: 270, borderRadius: 150, marginTop: 50},
  title1: {color: 'gray', fontWeight: 'bold', fontSize: 35},
  title2: {color: 'white', fontWeight: 'bold', fontSize: 35},
  container: {
    flex: 3,
    flexDirection: 'column',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  reverse: {
    transform: [{rotate: '135deg'}],
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 40,
  },
  btnText: {color: 'white', fontSize: 25},
  createBy:{color: 'gray', marginTop: 40}
});
